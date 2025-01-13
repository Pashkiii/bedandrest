import { BookingDb } from '../../model/storage/booking-db.js';
import { convertBookingDto } from '../../model/booking/booking.js';
import { log } from '../../model/logger/index.js';

export class BookingGetService {
	static async getActiveBookings(beginDate) {
		const db = new BookingDb();
		const { error, bookings = [] } = await db.getActiveBookings(beginDate);

		if (error) {
			await log(`ERROR. BookingService. Get bookings error: ${JSON.stringify(error)}`);

			return [];
		}

		return bookings.map((b) => convertBookingDto(b));
	}

	static async getBookingById(bookingId) {
		const db = new BookingDb();
		const { error, booking } = await db.getBookingById(bookingId);

		if (error) {
			await log(`ERROR. BookingService. Get booking by id (${bookingId}) error: ${JSON.stringify(error)}`);

			return null;
		}

		if (!booking) {
			return null;
		}

		return convertBookingDto(booking);
	}

	static async getBookingsStartingToday(date) {
		const db = new BookingDb();
		const { error, bookings = [] } = await db.getBookingsByBeginDate(date);

		if (error) {
			await log(`ERROR. BookingService. Get bookings starting today: ${JSON.stringify(error)}`);
		}

		return bookings.map((b) => convertBookingDto(b));
	}

	static async getBookingsEndingToday(date) {
		const db = new BookingDb();
		const { error, bookings = [] } = await db.getBookingsEndingToday(date);

		if (error) {
			await log(`ERROR. BookingService. Get bookings ending today: ${JSON.stringify(error)}`);
		}

		return bookings.map((b) => convertBookingDto(b));
	}
}