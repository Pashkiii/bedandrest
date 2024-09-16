import { log } from './logger/index.js';
import { makeCreateBookMessage } from './message/index.js';
import { sendMessage } from './sender/index.js';
import { Storage } from './storage/index.js';


export async function createBook(data) {
    try {
        const storage = new Storage();
        storage.setBook(data.id, data);

        const message = makeCreateBookMessage(data);
        await sendMessage(data.phone, message);
    } catch (err) {
        log(err);
    }
}

export async function updateBook(data) {
    try {

    } catch (err) {

    }
}

export async function deleteBook(data) {
    try {

    } catch (err) {

    }
}
