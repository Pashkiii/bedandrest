const { log } = require('./logger/index.js');
const { makeCreateBookMessage } = require('./message/index.js');
const { sendMessage } = require('./sender/index.js');
const { Storage } = require('./storage/index.js');

function convertToPostgresTime(date) {
    return new Date(date.getTime() + (1000 * 60 * (-(new Date()).getTimezoneOffset()))).toISOString().replace('T', ' ').replace('Z', '');
}

async function createBook(book) {
    try {
        if (!book.phone || !book.beginDate) {
            return;
        }

        const message = makeCreateBookMessage(book);
        console.log(message);

        // const sendResult = await sendMessage(book.phone, message);
        // if (sendResult.ok) {
        //     return;
        // }

        const data = {
            id,
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
    createBook,
    updateBook,
    deleteBook
};
