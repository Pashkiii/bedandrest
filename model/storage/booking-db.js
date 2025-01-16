import { Supabase } from './base.js';
import { convertDateToUtcTimezone } from '../lib.js';

export class BookingDb extends Supabase {
	constructor() {
		super();
		this.table = 'barbook';
	}

	async getActiveBookings(beginDate) {
		const beginDateUtc = convertDateToUtcTimezone(beginDate);
		const { error, data, status } = await this.client
			.from(this.table)
			.select()
			.gte('begin_date', beginDateUtc)
			.order('begin_date', { ascending: true });

		return { error, bookings: data };
	}

	async getBookingById(bookingId) {
		const { error, data } = await this.client
			.from(this.table)
			.select()
			.eq('id', bookingId);
		const booking = Array.isArray(data) && data.length > 0 ? data[0] : null;

		return { error, booking };
	}

	async getBookingsByBeginDate(beginDate) {
		const beginDateUtc = convertDateToUtcTimezone(beginDate);
		const { error, data } = await this.client
			.from(this.table)
			.select()
			.eq('begin_date', beginDateUtc);

		return { error, bookings: data };
	}

	/**
	 * @param {Date} endDate
	 */
	async getBookingsByEndDate(endDate) {
		const endDateUtc = convertDateToUtcTimezone(endDate);
		const { error, data } = await this.client
			.from(this.table)
			.select()
			.eq('end_date', endDateUtc);

		return { error, bookings: data };
	}

	async addBooking(booking) {
		const { error, status } = await this.client
			.from(this.table)
			.insert(booking);

		return { error };
	}

	async updateBooking(bookingId, booking) {
		const { error, status } = await this.client
			.from(this.table)
			.update(booking)
			.eq('id', bookingId);

		return { error };
	}

	async updateBookings(bookingsDto) {
		const { error, status } = await this.client
			.from(this.table)
			.upsert(bookingsDto)
			.select();

		return { error };
	}

	async deleteBooking(bookingId) {
		const { error, status } = await this.client
			.from(this.table)
			.delete()
			.eq('id', bookingId);

		return { error };
	}
}