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

            console.log('Response:');
            console.log(response);

            if (response.ok) {
                return await response.json();
            }

        } catch (err) {
            console.error(err);
            log('WhatsApp send message error')
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
    console.log(message);
    return;

    const whatsAppSender = new WhatsAppSender();
    return await whatsAppSender.send(phone, message);
}

module.exports = {
    sendMessage
};
