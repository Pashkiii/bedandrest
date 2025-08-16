import { syncDateToMoscow } from '../lib/index.js';
import { log } from '../model/logger/index.js';
import { BookingGetService } from '../services/bookings/booking-get-service.js';
import { sendThirdMessage } from './lib.js';

export async function leaveBooking() {
	const today = syncDateToMoscow(new Date());

	try {
		const bookings = await BookingGetService.getBookingsEndingToday(today);
		if (!Array.isArray(bookings)) {
			await log([
				'ERROR',
				'LeaveBooking',
				'"bookings" not iterable',
				`bookings: ${bookings} (${typeof bookings})`,
			].join('. '));
		}

		if (bookings.length === 0) {
			return;
		}

		const successSentBookingIds = [];

		for(const booking of bookings) {
			if (booking.apartmentId !== 219768) {
				continue;
			}

			const { done } = await sendThirdMessage(booking);

			if (done) {
				successSentBookingIds.push(booking.id);
			}
		}

		if (successSentBookingIds.length < bookings.length) {
			await log([
				'WARN',
				`${today.toLocaleString()}`,
				`Sent ${successSentBookingIds.length}/${bookings.length} leave messages bookings`,
			]);
		}
	} catch (error) {
		await log([
			'ERROR',
			'Leave booking',
			`Start time: ${today.toLocaleString()}`,
			`Error ${error.name}: ${error.message}`,
		].join('. '));
	}
}