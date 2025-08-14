import { BRAND } from '../const.js';

export class ConfirmBookMessageCreator {
    constructor(data) {
        this.data = data.book;
        this.contractLink = data.contractLink;
    }

    makeMessage() {
        return `
🏠 Доброе утро!

Сегодня день вашего заселения в апартаменты ${BRAND}.

Чтобы всё прошло быстро:

${this.#makeDocumentBlock()}

2. 📞 Сообщите нам за 1 час до прибытия

+7 (914) 558-40-44 · +7 (963) 802-45-59

По всем вопросам пишите или звоните — не стесняйтесь, мы всегда на связи.

До скорой встречи! 😊

С уважением, команда ${BRAND}`;
    }

    #makeDocumentBlock() {
        if (!this.contractLink) {
            return '';
        }

        return `
1. 📝 Подпишите онлайн-договор:${this.contractLink}
    
Это безопасно: подписание проходит на защищённой платформе, данные шифруются, доступ ограничен. У сервиса есть все необходимые сертификаты — по запросу пришлём подтверждения.
(если уже подписали — спасибо!)`;
    }
}
