const { extraServices } = require('../const.js');

function makeExtraServicesBlock(apartment) {
    const link = extraServices[apartment.id] || undefined;
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

function makeCreateBookMessage(data) {
    const clientName = data.clientName || '';
    const beginDate = data.beginDate.toLocaleDateString('ru-RU', {
        year: "numeric",
        month: "long",
        day: "numeric",
    });


    return `
Здравствуйте${clientName && ', ' + clientName}!

Мы с радостью сообщаем, что ждем Вас ${beginDate} в квартире от BedAndRest. Мы готовимся к Вашему прибытию и хотим сделать Ваше пребывание максимально комфортным и запоминающимся.
${makeExtraServicesBlock(data.apartment)}
Если у Вас возникнут вопросы или особые пожелания, пожалуйста, свяжитесь с нами по телефонам:

📞 +7 (914) 558-40-44

📞 +7 (963) 802-45-59

С нетерпением ждем встречи с Вами!

С уважением,
Команда BedAndRest.`;
}

function makeDocument() {
    return `
    Подпишите онлайн-договор аренды (это займет всего пару минут):

    🔗 👉 Подписать онлайн-договор
`;
}

function makeConfirmBookMessage(data) {
    const clientName = data.clientName || '';

    return `
Здравствуйте${clientName ? `, ${clientName}` : ''}!

🎉 Сегодня мы рады приветствовать Вас в квартире от BedAndRest!

Чтобы Ваше заселение прошло быстро и без задержек, пожалуйста:

    Позвоните нам за 1 час до прибытия, чтобы мы могли подготовиться к Вашему заселению.

    📞 +7 (914) 558-40-44

    📞 +7 (963) 802-45-59

На нашем сайте представлены самые выгодные предложения по аренде квартир:

🌐 🌟 https://blg.bedandrest.ru/katalog-kvartir/

Если у Вас возникнут вопросы или потребуется помощь, мы всегда на связи.

До скорой встречи! Желаем Вам прекрасного пребывания.

С уважением,
Команда BedAndRest`;
}

module.exports = {
    makeCreateBookMessage,
    makeConfirmBookMessage
};
