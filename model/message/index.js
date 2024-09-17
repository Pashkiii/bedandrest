const { extraServices } = require('../const.js');

function makeExtraServicesBlock(apartment) {
    const link = extraServices[apartment.id] || undefined;
    if (!link) return '';

    return `

Специально для вас мы подготовили эксклюзивные предложения:

    🎶 Атмосферные местные концерты
    🍽 Доставка блюд из любимых ресторанов прямо в номер
    🏞 Увлекательные экскурсии и мероприятия
    🦪 Дегустация вкуснейших благовещенских морепродуктов

Узнать подробнее и заказать услуги вы можете по ссылке: ${link}

`;
}

function makeCreateBookMessage(data) {
    const clientName = data.clientName || '';
    const beginDate = data.beginDate.toLocaleDateString('ru-RU', {
        year: "numeric",
        month: "long",
        day: "numeric",
    });


    return `
Здравствуйте${clientName && ', ' + clientName}!

Мы с радостью сообщаем, что ждем вас ${beginDate} в BedAndRest. Мы готовимся к вашему прибытию и хотим сделать ваше пребывание максимально комфортным и запоминающимся.
${makeExtraServicesBlock(data.apartment)}
Если у вас возникнут вопросы или особые пожелания, пожалуйста, свяжитесь с нами по телефонам:

📞 +7 (914) 558-40-44

📞 +7 (963) 802-45-59

С нетерпением ждем встречи с вами!

С уважением,
Команда BedAndRest.`;
}

module.exports = {
    makeCreateBookMessage
};
