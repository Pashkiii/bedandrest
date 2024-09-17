const fetch = require('node-fetch');
const { log } = require('../logger/index.js');

class WhatsAppSender {
    constructor() {
        this.profileId = process.env.WAPPI_PROFILE_ID;
        this.token = process.env.WAPPI_TOKEN;
    }

    async send(phone, message) {
        try {
            const body = JSON.stringify({
                recipient: phone,
                body: message
            });

            const response = await fetch(`https://wappi.pro/api/sync/message/send?profile_id=${this.profileId}`, {
                method: 'post',
                headers: this.headers,
                body
            });

            if (response.ok) {
                return {
                    ok: true,
                    result: await response.json()
                };
            }

            return {
                ok: false,
                error: response.status
            }
        } catch (err) {
            console.error(err);
            log('WhatsApp send message error');
            
            return {
                ok: false,
                error: err
            };
        }
    }

    get headers() {
        const headers = {};

        headers['Content-Type'] = 'application/json';
        headers['Authorization'] = this.token;

        return headers;
    }
}

async function sendMessage(phone, message) {
    if (process.env.NODE_ENV === 'development') {
        console.log(phone, message);
        return { ok: true };
    }

    const whatsAppSender = new WhatsAppSender();
    const result = await whatsAppSender.send(phone, message);

    return result;
}

module.exports = {
    sendMessage
};
