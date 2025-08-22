import { BRAND } from '../const.js';
import { log } from '../logger/index.js';

export class CreateBookMessageCreator {
    constructor(apartment = null) {
        this.apartment = apartment;
    }

    write(booking) {
        return `
Здравствуйте! 😊

Ваше бронирование в ${BRAND} подтверждено${this.#getDates(booking)}${this.#getAddress()}.

Чтобы сделать пребывание ещё удобнее, Вы можете заранее оформить:

• 🎶 местные концерты
• 🍽 доставку еды в апартаменты
• 🏞 экскурсии и мероприятия
• 🦪 дегустацию морепродуктов
${this.#makeExtraServicesBlock()}

Если появились вопросы — просто ответьте на это сообщение или позвоните:

📞 +7 (914) 558-40-44 | +7 (963) 802-45-59

С уважением, команда BedAndRest`;
    }

    #getDates(booking) {
        return ` ${this.#formatDate(booking.beginDate)} - ${this.#formatDate(booking.endDate)}`;
    }

    #formatDate(date) {
        const d = new Date(date);
        const formatter = new Intl.DateTimeFormat('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });

        return formatter.format(d);
    }

    #getAddress() {
        return this.apartment ? ` (${this.apartment.address})` : '';
    }

    #makeExtraServicesBlock() {
        if (!this.apartment) {
            void log(`Apartment data not found. ApartmentId: ${this.apartment.id} createBookMessageCreator.makeExtraServicesBlock`);
            return '';
        }


        const link = this.apartment?.mapLink;
        if (!link) {
            void log(`Ads link for apartment not found. ApartmentId: ${this.apartment.id} createBookMessageCreator.makeExtraServicesBlock`);
            return '';
        }

        return `

👉 Все услуги тут: https://booking.bedandrest.ru${link}
    `;
    }
}
