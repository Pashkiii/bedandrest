import { Op, Sequelize } from 'sequelize';
import { convertDateToUtcTimezone } from '../lib.js';
import { BookingModel } from '../model/booking.js';

export class BookingDb {
	async getActiveBookings(beginDate) {
		try {
			const beginDateUtc = convertDateToUtcTimezone(beginDate, { onlyDay: true });
			const bookings = await BookingModel.findAll({
				where: {
					beginDate: {
						[Op.gte]: beginDateUtc
					}
				},
				order: [
					['beginDate', 'ASC']
				]
			});

			return { error: null, bookings };
		} catch (error) {
			return { error, bookings: [] };
		}
	}

	async getBookingById(bookingId) {
		try {
			const booking = await BookingModel.findByPk(bookingId);

			return { error: null, booking };
		} catch (error) {
			return { error, booking: null };
		}
	}

	async getBookingsByBeginDate(beginDate) {
		try {
			const beginDateUtc = convertDateToUtcTimezone(beginDate, { onlyDay: true });
			const bookings = await BookingModel.findAll({
				where: Sequelize.literal(`DATE(beginDate) = '${beginDateUtc}'`)
			});

			return {
				error: null,
				bookings: bookings.map((b) => b.dataValues)
			};
		} catch (error) {
			return { error, bookings: [] };
		}
	}

	/**
	 * @param {Date} endDate
	 */
	async getBookingsByEndDate(endDate) {
		try {
			const endDateUtc = convertDateToUtcTimezone(endDate, { onlyDay: true });
			const bookings = await BookingModel.findAll({
				where: Sequelize.literal(`DATE(endDate) = '${endDateUtc}'`)
			});

			return {
				error: null,
				bookings: bookings.map((b) => b.dataValues)
			};
		} catch (error) {
			return { error, bookings: [] }
		}
	}

	/**
	 * @param {number} apartmentId
	 * @param {Date} date
	 */
	async getActiveBookingByApartmentId(apartmentId, date) {
		try {
			const dateUtc = convertDateToUtcTimezone(date, { onlyDay: true });
			const bookingIds = await BookingModel.findAll({
				attributes: ['id'],
				where: {
					apartmentId,
					beginDate: {
						[Op.lte]: dateUtc
					},
					endDate: {
						[Op.gte]: dateUtc
					}
				}
			}) || [];
			const ids = bookingIds.map((booking) => booking.dataValues.id);

			return { error: null, bookingIds: ids };
		} catch (error) {
			return { error, bookingIds: [] };
		}
	}

	async addBooking(bookingDto) {
		try {
			const model = await BookingModel.create(bookingDto)

			return { error: null, booking: model.dataValues };
		} catch (error) {
			return { error };
		}
	}

	async updateBooking(bookingId, bookingDto) {
		try {
			const model = await BookingModel.update(
				bookingDto,
				{
					where: {
						id: bookingId
					}
				}
			);

			return { error: null };
		} catch (error) {
			return { error };
		}
	}

	async updateBookings(bookingsDto) {
		try {
			await BookingModel.upsert(bookingsDto);

			return { error: null };
		} catch (error) {
			return { error };
		}
	}

	async deleteBooking(bookingId) {
		try {
			const model = await BookingModel.destroy({
				where: {
					id: bookingId
				}
			});

			return { error: null }
		} catch (error) {
			return { error };
		}
	}
}
