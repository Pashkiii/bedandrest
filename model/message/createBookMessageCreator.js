import { BRAND } from '../const.js';
import { log } from '../logger/index.js';

export class CreateBookMessageCreator {
    constructor(apartment = null) {
        this.apartment = apartment;
    }

    write() {
        return `
Здравствуйте! 😊

Спасибо, что выбрали апартаменты ${BRAND} для вашего пребывания в Благовещенске! Мы с нетерпением ждём встречи с вами.
${this.#makeExtraServicesBlock()}
Если возникнут вопросы, пишите или звоните нам!

📞 +7 (914) 558-40-44

📞 +7 (963) 802-45-59

С уважением,

Команда BedAndRest`;
    }


    #makeExtraServicesBlock() {
        if (!this.apartment) {
            void log(`Apartment data not found. ApartmentId: ${this.apartment.id} createBookMessageCreator.makeExtraServicesBlock`);
            return '';
        }

        
        const link = this.apartment?.ads;
        if (!link) {
            void log(`Ads link for apartment not found. ApartmentId: ${this.apartment.id} createBookMessageCreator.makeExtraServicesBlock`);
            return '';
        }
        
        return `

Специально для вас:

🎶 Местные концерты
🍽 Доставка еды из ресторанов прямо в номер
🏞 Экскурсии и мероприятия
🦪 Дегустация местных морепродуктов

👉 Подробнее и заказ услуг по ссылке: ${link}
    
    `;
    }
}
