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

	/**
	 * @param {Date} date
	 */
	static async getBookingsEndingToday(date) {
		const db = new BookingDb();
		const { error, bookings = [] } = await db.getBookingsByEndDate(date);

		if (error) {
			await log([
				`ERROR. BookingService. Get bookings ending today`,
				`Error: ${error.name}; ${error.message}; ${JSON.stringify(error)}`,
			].join('. '));
		}

		return bookings.map((b) => convertBookingDto(b));
	}

	/**
	 * @param {number} apartmentId
	 * @param {Date} date
	 * @returns {Promise<id | null>}
	 */
	static async getActiveBookingByApartmentId(apartmentId, date) {
		const db = new BookingDb();
		const { error, bookingIds } = await db.getActiveBookingByApartmentId(
			apartmentId,
			date,
		);

		if (error) {
			await log([
				'ERROR. BookingService. GetActiveBookingByApartmentId',
				`Error: ${error.name}: ${error.message}`,
			]);

			return null;
		}
		if (!Array.isArray(bookingIds)) {
			await log([
				'WARN. BookingService. GetActiveBookingByApartmentId',
				`BookingIds is not iterable (${typeof bookingIds}): ${JSON.stringify(bookingIds)}`
			]);

			return null;
		}
		if (bookingIds.length > 1) {
			await log([
				'WARN. BookingService. GetActiveBookingByApartmentId',
				`BookingIds more that one: ${JSON.stringify(bookingIds)}`,
				`ApartmentId: ${apartmentId}`,
				`Date: ${date.toLocaleString()}`,
			]);
		}

		return bookingIds.map((bookingId) => bookingId.id);
	}
}