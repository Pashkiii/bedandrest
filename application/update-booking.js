import { BookingGetService } from '../services/bookings/booking-get-service.js';
import { log } from '../model/logger/index.js';
import { createBooking } from './create-booking.js';
import { syncDateToMoscow } from '../model/lib.js';
import { ApartmentService } from '../services/apartment/apartment-service.js';
import {
	sendFirstMessage,
	sendSecondMessage
} from './lib.js';
import { BookingActionService } from '../services/bookings/booking-action-service.js';

export async function updateBooking(bookingModel) {
	try {
		const booking = await BookingGetService.getBookingById(bookingModel.bookingId);
		if (!booking) {
			await log(`WARN. Update booking. Booking not found ${JSON.stringify(booking)}`);
			await createBooking(bookingModel);

			return;
		}

		const apartment =  await ApartmentService.getApartmentById(bookingModel.apartmentId);
		const today = syncDateToMoscow(new Date());
		if (!booking.phone && bookingModel.phone) {
			if (!booking.firstMessageSent && dateLater(today, booking.beginDate)) {
				const firstMsgSendingResult = await sendFirstMessage(bookingModel, apartment);
				if (firstMsgSendingResult.done) {
					bookingModel.firstMessageSent = true;
				}
			}
		}

		if (!booking.secondMessageSent) {
			const secondMsgSendingResult = await sendSecondMessage(bookingModel, apartment);
			if (secondMsgSendingResult.done) {
				bookingModel.secondMessageSent = true;
			}
		}

		await BookingActionService.updateBooking(bookingModel);
	} catch (error) {
		await log(`ERROR. UpdateBooking. ${error.name}: ${error.message}`);
	}
}

function dateLater(date1, date2) {
	const splitDate = (date) => [date.getDate(), date.getMonth(), date.getFullYear()];
	const d1 = splitDate(date1);
	const d2 = splitDate(date2);

	return d1[0] <= d2[0] && d1[1] <= d2[1] && d1[2] <= d2[2];
}
