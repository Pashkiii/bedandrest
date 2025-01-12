import { log } from './logger/index.js';
import { ConfirmBookMessageCreator } from './message/confirmBookMessageCreator.js';
import { CreateBookMessageCreator } from './message/createBookMessageCreator.js';
import { LeaveMessageCreator } from './message/leaveMessageCreator.js';
import { sendMessage } from './sender/index.js';
import { createContractService } from './service/create-contract.service.js';
import { Storage } from './storage/index.js';
import { syncDateToMoscow } from '../lib/index.js';
import { BookingActionService } from '../services/bookings/booking-action-service.js';
import { ApartmentService } from '../services/apartment/apartment-service.js';
import { BookingGetService } from '../services/bookings/booking-get-service.js';
import { ContractService } from '../services/contract-service.js';
import { MessengerService } from '../services/messenger-service.js';
import { sendSecondMessage } from '../application/lib.js';

export async function confirmBookings() {
	const today = syncDateToMoscow(new Date());

	try {
		const [bookings, apartments] = await Promise.all([
			BookingGetService.getBookingsStartingToday(today),
			ApartmentService.getAllApartmentsList(),
		]);
		if (bookings.length === 0) {
			return;
		}

		const sentMessagesIds = [];

		for (const booking of bookings) {
			const apartment = apartments.find((a) => a.id === booking.apartmentId) || null;
			await confirmBooking(booking, apartment);
		}

		const storage = new Storage();
		const books = await storage.getBooksByBeginDate(today);

		if (!books.length) {
			return;
		}

		const sendedMessagesIds = [];

		for (const book of books) {
			const bookId = await confirmBooking(book);

			if (bookId) {
				sendedMessagesIds.push(bookId);
			}
		}

		await storage.setSecondMessageSended(sendedMessagesIds);
	} catch (error) {
		log(`Send second messages ${today} error`, error);
	}
}

export async function confirmBooking(bookingModel, apartment = null) {
	try {
		const messengerService = new MessengerService();
		const contractService = new ContractService();
		const sendContractResult = contractService.sendContract(bookingModel, apartment);
		if (!sendContractResult.done || !sendContractResult.status) {
			const managerTel = process.env.MANAGER_PHONE;
			const link = sendContractResult?.result?.link || null;
			await messengerService.send(managerTel, `
				Внимание! Проблема с отправкой договора OkiDoki, проверьте данные и отправьте договор вручную.
				Бронирование https://realtycalendar.ru/chessmate/event/${bookingModel.id}

				${link ? 'Ссылка на договор: ' + link : ''}
		`);
		}

		const contractLink = await createContractService(booking);

		if (!contractLink) {
			return;
		}

		const messageCreator = new ConfirmBookMessageCreator({
			book: booking,
			contractLink
		});
		const message = messageCreator.makeMessage();
		await sendMessage(booking.phone, message);

		return booking.id;
	} catch (error) {
		log('Send second message error', JSON.stringify({
			book: booking,
			error,
		}));
	}
}

export async function leaveBook() {
	const today = new Date();

	try {
		const storage = new Storage();
		const books = await storage.getBooksByEndDate(today);

		if (books.length === 0) return;

		for (const book of books) {
			try {
				await log(`INFO. Leave booking: ${JSON.stringify(book)}`);

				const messageCreator = new LeaveMessageCreator(book);
				const message = messageCreator.makeMessage();

				await sendMessage(book.phone, message);
			} catch (error) {
				await log('Send leave message error', JSON.stringify({
					bookId: book.id,
					error,
				}));
			}
		}

	} catch (error) {
		await log(`Send leave message ${today} error`, error);
	}
}
