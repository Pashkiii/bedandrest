import { BRAND } from '../const.js';

export class ConfirmBookMessageCreator {
    constructor(data) {
        this.data = data.book;
        this.contractLink = data.contractLink;
    }

    makeMessage() {
        return `
Здравствуйте!

🎉 Сегодня мы рады приветствовать Вас в квартире от ${BRAND}!

Чтобы Ваше заселение прошло быстро и без задержек, пожалуйста:
    ${this.#makeDocumentBlock()}
    Позвоните нам за 1 час до прибытия, чтобы мы могли подготовиться к Вашему заселению.

    📞 +7 (914) 558-40-44

    📞 +7 (963) 802-45-59

На нашем сайте представлены самые выгодные предложения по аренде квартир:

🌐 🌟 https://blg.bedandrest.ru/katalog-kvartir/

Если у Вас возникнут вопросы или потребуется помощь, мы всегда на связи.

До скорой встречи! Желаем Вам прекрасного пребывания.

С уважением,
Команда ${BRAND}`;
    }

    #makeDocumentBlock() {
        if (!this.contractLink) {
            return '';
        }

        return `
    Подпишите онлайн-договор аренды (это займет всего пару минут):

    🔗 👉 ${this.contractLink}
    `;
    }
}
