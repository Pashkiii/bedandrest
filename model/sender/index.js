import { WhatsAppSender } from './whatsApp';
import { SenderError } from './exception';

export async function sendMessage(phone, message) {
    if (process.env.NODE_ENV === 'development') {
        console.log(phone, message);
        return { ok: true };
    }

    const sender = new WhatsAppSender();
    const result = await sender.send(phone, message);

    return result;
}
