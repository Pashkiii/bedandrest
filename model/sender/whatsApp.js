import fetch from 'node-fetch';
import { log } from '../logger/index.js';
import { SenderError } from './exception.js';

export class WhatsAppSender {
    constructor() {
        this.profileId = process.env.WAPPI_PROFILE_ID;
        this.token = process.env.WAPPI_TOKEN;
    }

    async send(phone, message) {
        try {
            const body = JSON.stringify({
                recipient: `+${phone}`,
                body: message
            });

            await log(`INFO. WhatsApp message: ${JSON.stringify(body)}`);

            const response = await fetch(`https://wappi.pro/api/sync/message/send?profile_id=${this.profileId}`, {
                method: 'post',
                headers: this.headers,
                body
            });

            if (response.ok) {
                const responseData = await response.json();
                await log(`INFO. WhatsApp response: ${JSON.stringify(responseData)}`);
                return {
                    ok: true
                };
            } else {
                await log(`ERROR. WhatsApp send message error. Response ${JSON.stringify(await response.json())}`);
            }

            throw new SenderError('Message do\'t sended to WhatsApp', response.status);
        } catch (err) {
            console.error(err);
            log('WhatsApp send message error');

            throw new SenderError('WhatsAppSender error', err);
        }
    }

    get headers() {
        const headers = {};

        headers['Content-Type'] = 'application/json';
        headers['Authorization'] = this.token;

        return headers;
    }
}
