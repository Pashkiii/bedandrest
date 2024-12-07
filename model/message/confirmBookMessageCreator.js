import { BRAND } from '../const.js';

export class ConfirmBookMessageCreator {
    constructor(data) {
        this.data = data.book;
        this.contractLink = data.contractLink;
    }

    makeMessage() {
        return `
Здравствуйте! 🏠

Сегодня ваш день заселения в апартаменты ${BRAND}!

Чтобы всё прошло быстро:
${this.#makeDocumentBlock()}
📞 Сообщите нам за 1 час до прибытия:

📞 +7 (914) 558-40-44

📞 +7 (963) 802-45-59

До скорой встречи! 😊`;
    }

    #makeDocumentBlock() {
        if (!this.contractLink) {
            return '';
        }

        return `
📝 Подпишите онлайн-договор:${this.contractLink}
    `;
    }
}
