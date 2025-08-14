import { CreateBookMessageCreator } from '../message/createBookMessageCreator.js';
import { ConfirmBookMessageCreator } from '../message/confirmBookMessageCreator.js';
import { sendMessage } from '../sender/index.js';
import { log } from '../logger/index.js';
import { createContractService } from './create-contract.service.js';
import { BookingActionService } from '../../services/bookings/booking-action-service.js'

export class CreateBookingService {
    async create(book) {
        if (!book.phone || !book.beginDate) {
            return;
        }

        const today = new Date();

        try {
            const message = (new CreateBookMessageCreator(book)).write(book);
            const sendResult = await sendMessage(book.phone, message);
            if (!sendResult.ok) {
                return;
            }

            const data = {
                id: book.id,
                createDate: this.#convertToPostgresTime(today),
                beginDate: this.#convertToPostgresTime(book.beginDate),
                endDate: this.#convertToPostgresTime(book.endDate),
                clientId: book.clientId,
                clientName: book.clientName,
                apartmentId: book.apartment.id,
                phone: book.phone,
                firstMessageSended: true,
                secondMessageSended: false,
                data: typeof book.data === 'string' ? book.data : JSON.stringify(book.data)
            };

            if (this.#compareDate(book.beginDate, today)) {
                await this.#sendConfirmMessage(book);
                data.secondMessageSended = true;
            }

            await BookingActionService.insertBooking(data);
        } catch (error) {
            console.error('Create booking error', error);
            log(`CreateBookingService. Create booking error: ${JSON.stringify(error)}. Error message: ${error?.message}`);
        }
    }

    async #sendConfirmMessage(book) {
        const contractLink = await createContractService(book);
        if (!contractLink) {
            await log(`Contract link not created. ${book.id}. CreateBookingService.SendConfirmMessage`);
        }

        const message = (new ConfirmBookMessageCreator({ 
            book,
            contractLink
        })).makeMessage();
        await sendMessage(book.phone, message);
    }

    /**
     * @param {Date} bookingDate 
     * @param {Date} date
     */
    #compareDate(bookingDate, date) {
        const bookingLocaleDateStr = bookingDate.toLocaleDateString();
        const todayDateLocalStr = date.toLocaleDateString();

        return bookingLocaleDateStr === todayDateLocalStr;
    }

    /**
     * @param {Date} date
     */
    #convertToPostgresTime(date) {
        return new Date(date.getTime() + (1000 * 60 * (-(new Date()).getTimezoneOffset()))).toISOString().replace('T', ' ').replace('Z', '');
    }
}
