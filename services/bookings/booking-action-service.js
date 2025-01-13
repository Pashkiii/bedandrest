import { BookingDb } from '../../model/storage/booking-db.js';
import { createBookingDto } from '../../model/booking/booking-dto.js';
import { log } from '../../model/logger/index.js';

export class BookingActionService {
	static async insertBooking(bookingModel) {
		const bookingStorage = new BookingDb();
		const bookingDto = createBookingDto(bookingModel);

		await log(`INFO. BookingActionService.InsertBooking. BookingModel: ${JSON.stringify(bookingModel)}. BookingDto: ${JSON.stringify(bookingDto)}`);

		const { error } = await bookingStorage.addBooking(bookingDto);

		if (error) {
			await log(`ERROR. BookingService. Insert booking error: ${error.name}: ${error.message}`);
		}
	}

	static async updateBooking(bookingModel) {
		const bookingStorage = new BookingDb();
		const bookingDto = createBookingDto(bookingModel);
		const { error } = await bookingStorage.updateBooking(
			bookingModel.id,
			bookingDto
		);

		if (error) {
			await log(`ERROR. BookingService. Update booking error: ${error.name}: ${error.message}`);
		}
	}

	static async updateBookingsSecondStatus(bookingModels) {
		const bookingsDto = bookingModels.map((booking) => {
			return {
				id: booking.id,
				'second_message_sended': booking.secondMessageSent,
			};
		});
		const bookingStorage = new BookingDb();
		const { error } = await bookingStorage.updateBookings(bookingsDto);

		if (error) {
			await log(`ERROR. BookingService. Update bookings error: ${error.name}: ${error.message}`);
		}
	}
}