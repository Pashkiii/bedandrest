const { log } = require('./logger/index.js');
const { makeCreateBookMessage } = require('./message/index.js');
const { sendMessage } = require('./sender/index.js');
const { Storage } = require('./storage/index.js');

async function createBook(data) {
    try {
        const storage = new Storage();
        storage.setBook(data.id, data);

        const message = makeCreateBookMessage(data);
        const sendResult = await sendMessage(data.phone, message);
        if (sendResult.ok) {
            return;
        }
    } catch (err) {
        log(err);
    }
}

async function updateBook(data) {
    try {

    } catch (err) {

    }
}

async function deleteBook(data) {
    try {

    } catch (err) {

    }
}

module.exports = {
    createBook,
    updateBook,
    deleteBook
};
