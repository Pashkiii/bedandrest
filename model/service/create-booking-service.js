import { DB } from '../model/db/index.js';
import { CreateBookMessageCreator } from '../message/createBookMessageCreator.js';
import { ConfirmBookMessageCreator } from '../message/confirmBookMessageCreator.js';
import { sendMessage } from '../sender/index.js';
import { log } from '../logger/index.js';
import { createContractService } from './create-contract.service.js';

export class CreateBookingService {
    async create(book) {
        if (!book.phone || !book.beginDate) {
            return;
        }

        const today = new Date();

        try {
            const message = (new CreateBookMessageCreator(book)).makeMessage();
            const sendResult = await sendMessage(book.phone, message);
            if (!sendResult.ok) {
                return;
            }

            const data = {
                id: book.id,
                create_date: this.#convertToPostgresTime(today),
                begin_date: this.#convertToPostgresTime(book.beginDate),
                end_date: this.#convertToPostgresTime(book.endDate),
                client_id: book.clientId,
                client_name: book.clientName,
                apartment_id: book.apartment.id,
                phone: book.phone,
                first_message_sended: true,
                second_message_sended: false,
                data: book.data,
            };

            if (this.#compareDate(book.beginDate, today)) {
                await this.#sendConfirmMessage(book);
                data.second_message_sended = true;
            }

            await DB.setBook(book);
        } catch (error) {
            console.error('Create booking error', error);
            log(`CreateBookingService. Create booking error: ${JSON.stringify(error)}`);
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
        if (!sendResult.ok) {
            log(`Send confirm message error: ${JSON.stringify(sendResult)}. CreateBookingService.SendConfirmMessage`);
        }
    }

    /**
     * @param {Date} bookDate 
     * @param {Date} date
     */
    #compareDate(bookDate, date) {
        return bookDate.getFullYear() === date.getFullYear() &&
            bookDate.getMonth() === date.getMonth() &&
            bookDate.getDate() === date.getDate();
    }

    /**
     * @param {Date} booking date 
     */
    #convertToPostgresTime(date) {
        return new Date(date.getTime() + (1000 * 60 * (-(new Date()).getTimezoneOffset()))).toISOString().replace('T', ' ').replace('Z', '');
    }
}
