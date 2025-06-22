import { convertToPostgresTime } from '../../lib/index.js';

export function createBookingDto(bookingModel) {
	return {
		id: bookingModel.id,
		beginDate: convertToPostgresTime(bookingModel.beginDate),
		endDate: convertToPostgresTime(bookingModel.endDate),
		clientId: bookingModel.clientId,
		clientName: bookingModel.clientName,
		apartmentId: bookingModel.apartmentId,
		phone: bookingModel.phone,
		data: bookingModel.data,
		createDate: convertToPostgresTime(bookingModel.createDate),
		firstMessageSended: bookingModel.firstMessageSent,
		secondMessageSended: bookingModel.secondMessageSent,
	};
}
