import { isObject } from '../lib/index.js';
import { ParseDataError } from '../model/exception.js';
import { realtyCalendarAction } from '../model/const.js';

export class RealtyCalendarAdapter {
	action;
	statusCd;

	constructor(realtyCalendarBookingData) {
		this.realtyCalendarBookingData = realtyCalendarBookingData;
		this.#checkData();

		this.booking = this.#parseBooking();
	}

	#checkData() {
		if (!isObject(this.realtyCalendarBookingData) || !isObject(this.realtyCalendarBookingData.data)) {
			throw new ParseDataError('Invalid format data');
		}
	}

	#parseBooking() {
		if (isObject(this.realtyCalendarBookingData?.data?.booking)) {
			return this.realtyCalendarBookingData?.data?.booking;
		}

		throw new ParseDataError('Invalid format data. Booking not found');
	}

	extractBookingId() {
		const bookingId = parseInt(this.booking['id'], 10);

		if (isNaN(bookingId) || !bookingId) {
			throw new ParseDataError(`Parse "booking.id" error. Invalid value: ${bookingId}.`);
		}

		return bookingId;
	}

	extractAction() {
		if (this.action) {
			return this.action;
		}

		const action = this.realtyCalendarBookingData?.action || '';

		if (Object.values(realtyCalendarAction).includes(action)) {
			this.action = action;

			return action;
		}

		throw new ParseDataError(`Parse "action" error. Invalid value: ${action}.`);
	}

	extractStatusCd() {
		if (typeof this.statusCd === 'number') {
			return this.statusCd;
		}

		const statusCd = parseInt(this.booking['status_cd'], 10);

		if (isNaN(statusCd)) {
			throw new ParseDataError(`Parse "statusCd" error. Invalid value: ${statusCd}.`);
		}

		this.statusCd = statusCd;

		return statusCd;
	}

	extractBooking() {
		return {
			id: this.extractBookingId(),
			address: String(this.booking?.apartment?.address || ''),
			apartmentId: this.#extractApartmentId(),
			clientId: this.#extractClientId(),
			clientName: String(this.booking?.client?.fio || ''),
			phone: this.#extractPhone(),
			beginDate: this.#parseDate('begin_date'),
			endDate: this.#parseDate('end_date'),
			createDate: new Date(),
			firstMessageSent: false,
			secondMessageSent: false,
			data: JSON.stringify(this.realtyCalendarBookingData),
		};
	}

	#extractClientId() {
		let clientId = this.booking['client_id'];
		if (typeof clientId !== 'number') {
			clientId = parseInt(clientId);
		}
		if (isNaN(clientId)) {
			clientId = null;
		}

		return clientId;
	}

	#extractApartmentId() {
		const apartmentId = this.booking?.apartment?.id;

		if (typeof apartmentId !== 'number' || isNaN(apartmentId) || !apartmentId) {
			throw new ParseDataError(`Parse "apartmentId" error. Invalid value: ${JSON.stringify(this.booking['apartment'])}.`);
		}

		return apartmentId;
	}

	#extractPhone() {
		const phoneValue = String(this.booking?.client?.phone || '');
		const matches = phoneValue.match(/\d+/g) || [];

		if (!matches.length || !matches[0]) {
			return null;
		}

		return matches.join('');
	}

	#parseDate(fieldName) {
		if (isNaN(Date.parse(this.booking[fieldName]))) {
			throw new ParseDataError(`Parse ${fieldName} error. ${this.booking[fieldName]} is not a valid date`);
		}

		return new Date(this.booking[fieldName]);
	}
}