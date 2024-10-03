const { extraServices } = require('../const.js');

class CreateBookMessageCreator {
    constructor(data) {
        this.apartment = data.apartment;
        this.beginDate = data.beginDate.toLocaleDateString('ru-RU', {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    }

    makeMessage() {
        return `
Здравствуйте!

Мы с радостью сообщаем, что ждем Вас ${this.beginDate} в квартире от BedAndRest. Мы готовимся к Вашему прибытию и хотим сделать Ваше пребывание максимально комфортным и запоминающимся.
${this.makeExtraServicesBlock()}
Если у Вас возникнут вопросы или особые пожелания, пожалуйста, свяжитесь с нами по телефонам:

📞 +7 (914) 558-40-44

📞 +7 (963) 802-45-59

С нетерпением ждем встречи с Вами!

С уважением,
Команда BedAndRest.`;
    }


    makeExtraServicesBlock() {
        const link = extraServices[this.apartment.id] || undefined;
        if (!link) return '';

        return `
Специально для Вас мы подготовили эксклюзивные предложения:

    🎶 Атмосферные местные концерты
    🍽 Доставка блюд из любимых ресторанов прямо в номер
    🏞 Увлекательные экскурсии и мероприятия
    🦪 Дегустация вкуснейших благовещенских морепродуктов

Узнать подробнее и заказать услуги Вы можете по ссылке: ${link}
    
    `;
    }
}

module.exports = {
    CreateBookMessageCreator
};
