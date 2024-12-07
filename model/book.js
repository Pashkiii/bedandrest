import { log } from './logger/index.js';
import { ConfirmBookMessageCreator } from './message/confirmBookMessageCreator.js';
import { CreateBookMessageCreator } from './message/createBookMessageCreator.js';
import { LeaveMessageCreator } from './message/leaveMessageCreator.js';
import { sendMessage } from './sender/index.js';
import { createContractService } from './service/create-contract.service.js';
import { Storage } from './storage/index.js';
import { syncDateToMoscow } from './lib.js';

function convertToPostgresTime(date) {
    return new Date(date.getTime() + (1000 * 60 * (-(new Date()).getTimezoneOffset()))).toISOString().replace('T', ' ').replace('Z', '');
}

export async function confirmBookings() {
    const today = new Date();

    try {
        const date = syncDateToMoscow(today);

        const storage = new Storage();
        const books = await storage.getBooksByBeginDate(date);

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

export async function confirmBooking(book) {
    try {
        const contractLink = await createContractService(book);
        
        if (!contractLink){
            return;
        }

        const messageCreator = new ConfirmBookMessageCreator({ 
            book,
            contractLink
        });
        const message = messageCreator.makeMessage();
        await sendMessage(book.phone, message);

        return book.id;
    } catch (error) {
        log('Send second message error', JSON.stringify({
            book,
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
                const messageCreator = new LeaveMessageCreator(book);
                const message = messageCreator.makeMessage();

                await sendMessage(book.phone, message);
            } catch(error) {
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

export async function createBook(book) {
    try {
        if (!book.phone || !book.beginDate) {
            return;
        }

        const messageCreator = new CreateBookMessageCreator(book);
        const message = messageCreator.makeMessage();
        const sendResult = await sendMessage(book.phone, message);
        if (!sendResult.ok) {
            return;
        }

        const data = {
            id: book.id,
            create_date: convertToPostgresTime(new Date()),
            begin_date: convertToPostgresTime(book.beginDate),
            end_date: convertToPostgresTime(book.endDate),
            client_id: book.clientId,
            client_name: book.clientName,
            apartment_id: book.apartment.id,
            phone: book.phone,
            first_message_sended: true,
            second_message_sended: false,
            data: book.data,
        };

        const storage = new Storage();
        await storage.setBook(data);
    } catch (err) {
        log(err);
    }
}

export async function updateBook(book) {
    const data = {
        begin_date: convertToPostgresTime(book.beginDate),
        end_date: convertToPostgresTime(book.endDate),
        client_id: book.clientId,
        client_name: book.clientName,
        apartment_id: book.apartment.id,
        data: book.data,
    };

    const storage = new Storage();
    await storage.updateBook(book.id, data);
}

export async function deleteBook(data) {
    const storage = new Storage();
    await storage.deleteBook(data.id);
}
