import { log } from '../model/logger/index.js';
import { syncDateToMoscow } from '../lib/index.js';
import { BookingGetService } from '../services/bookings/booking-get-service.js';
import { ApartmentService } from '../services/apartment/apartment-service.js';
import { BookingActionService } from '../services/bookings/booking-action-service.js';
import { sendSecondMessage } from './lib.js';

export async function confirmBookings() {
	const today = syncDateToMoscow(new Date());

	try {
		const [bookings, apartments] = await Promise.all([
			BookingGetService.getBookingsStartingToday(today),
			ApartmentService.getAllApartmentsList(),
		]);

		if (!Array.isArray(bookings)) {
			await log([
				'ERROR',
				'ConfirmBooking',
				'"bookings" not iterable',
				`bookings: ${bookings} (${typeof bookings})`,
			].join('. '));
		}

		if (bookings.length === 0) {
			return;
		}

		const bookingsModelPatch = [];

		for (const booking of bookings) {
			const apartment = apartments.find((a) => a.id === booking.apartmentId) || null;
			const { done } = await sendSecondMessage(booking, apartment);

			if (done) {
				bookingsModelPatch.push({
					id: booking.id,
					secondMessageSent: true,
				});
			}
		}

		await BookingActionService.updateBookingsSecondStatus(bookingsModelPatch);
	} catch (error) {
		await log(`ERROR. Confirm bookings [${today.toLocaleDateString()}] error ${error.name}: ${error.message}`);
	}
}
