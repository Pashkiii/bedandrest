const { log } = require('./logger/index.js');
const { ConfirmBookMessageCreator } = require('./message/confirmBookMessageCreator.js');
const { CreateBookMessageCreator } = require('./message/createBookMessageCreator.js');
const { sendMessage } = require('./sender/index.js');
const { Storage } = require('./storage/index.js');
const { syncDateToMoscow } = require('./lib.js')

function convertToPostgresTime(date) {
    return new Date(date.getTime() + (1000 * 60 * (-(new Date()).getTimezoneOffset()))).toISOString().replace('T', ' ').replace('Z', '');
}

async function confirmBooking() {
    const today = new Date();

    try {
        const date = syncDateToMoscow(today);

        await log('Date',today.toUTCString());

        const storage = new Storage();
        const books = await storage.getBooksByBeginDate(date);

        if (!books.length) {
            return;
        }

        for (const book of books) {
            try {
                const messageCreator = new ConfirmBookMessageCreator(book);
                const message = messageCreator.makeMessage()
                await sendMessage(book.phone, message);
            } catch (error) {
                log('Send second message error', {
                    book,
                    error,
                });
            }
        }

        await storage.deleteBooks(books.map((b) => b.id));
    } catch (error) {
        log(`Send second messages ${today} error`, error);
    }
}

async function createBook(book) {
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

async function updateBook(book) {
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

async function deleteBook(data) {
    const storage = new Storage();
    await storage.deleteBook(data.id);
}

module.exports = {
    confirmBooking,
    createBook,
    updateBook,
    deleteBook
};
