import { log } from '../model/logger/index.js';
import { ApartmentService } from '../services/apartment/apartment-service.js';
import { BookingGetService } from '../services/bookings/booking-get-service.js';
import { MessengerService } from '../services/messenger-service.js';

export async function checkBookingByWifi(apartmentId, checkDate) {
	try {
		const [
			apartment,
			bookingIds
		] = await Promise.all([
			ApartmentService.getApartmentById(apartmentId),
			BookingGetService.getActiveBookingByApartmentId(apartmentId, checkDate),
		]);

		if (!apartment) {
			return {
				error: new Error('Apartment not found'),
				apartment: null,
				bookingId: bookingIds?.[0] || null,
			};
		}
		if (bookingIds === null || !Array.isArray(bookingIds)) {
			await log([
				'ERROR',
				'CheckBookingByWifi',
				`BookingIds is not iterable (${JSON.stringify(bookingIds)})`,
			]);

			return {
				apartment,
				bookingId: null,
			};
		}
		if (bookingIds.length === 0) {
			await sendMessageToAdmin(apartment, checkDate);

			return {
				apartment,
				bookingId: null,
			};
		}

		return {
			apartment,
			bookingId: bookingIds[0],
		};
	} catch (error) {
		await log.error([
			'ERROR',
			'CheckBookingByWifi',
			`Error: ${error.name}: ${error.message}`,
		]);

		return {
			error,
			apartmentId: null,
			bookingId: null,
		};
	}
}

async function sendMessageToAdmin(apartment, date) {
	try {
		const formatter = Intl.DateTimeFormat('ru-RU', {
			dateStyle: 'short',
			timeStyle: 'short',
		});
		const datetime = formatter.format(date);
		const message = `Внимание! Кто-то использовал ссылку в ${datetime} в квартире ${apartment.id} (${apartment.address})`;
		const phone = process.env.ADMIN_PHONE;
		const messenger = new MessengerService();
		await messenger.send(phone, message);
	}	catch (error) {
		await log([
			'ERROR',
			'CheckBookingByWifi',
			'SendMessageToAdmin',
			`${error.name}: ${error.message}`,
		]);
	}
}
