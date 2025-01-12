import { convertToPostgresTime } from '../../lib/index.js';

export function createBookingDto(bookingModel) {
	return {
		id: bookingModel.id,
		'begin_date': convertToPostgresTime(bookingModel.beginDate),
		'end_date': convertToPostgresTime(bookingModel.endDate),
		'client_id': bookingModel.clientId,
		'client_name': bookingModel.clientName,
		'apartment_id': bookingModel.apartmentId,
		phone: bookingModel.phone,
		data: bookingModel.data,
		'create_date': convertToPostgresTime(bookingModel.createDate),
		'first_message_sended': bookingModel.firstMessageSent,
		'second_message_sended': bookingModel.secondMessageSent,
	};
}
