const { extraServices } = require('../const.js');

function getExtraLink(apartmentId) {
    const link = extraServices[String(apartmentId)] || null;
    if (!link) return '';

    return `Мы подготовили интересные предложения ${link}`;
}

function makeCreateBookMessage(data) {
    return `Здравствуйте!     
    У Вас запланирован заезд ${data.beginDate.toLocaleDateString('ru-RU')}.
    ${getExtraLink(data.apartment.id)}
    `;
}

module.exports = {
    makeCreateBookMessage
};
