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
