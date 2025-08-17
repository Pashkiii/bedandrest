import { WhatsAppSender } from './whatsApp.js';

export async function sendMessage(phone, message) {
    if (process.env.NODE_ENV === 'development') {
        console.log(phone, message);
        return { ok: true };
    }

    const sender = new WhatsAppSender();

    return await sender.send(phone, message);
}
