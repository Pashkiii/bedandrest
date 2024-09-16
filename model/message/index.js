const { extraServices } = require('../const.js');

function getExtraLink(apartmentId) {
    const link = extraServices[String(apartmentId)] || null;
    if (!link) return '';

    return `Мы подготовили интересные предложения ${link}`;
}

function makeCreateBookMessage(data) {
    return `Здравствуйте!     
    У Вас запланирован заезд 01.01.2022.
    ${getExtraLink(data.apartment.id)}
    `;
}

module.exports = {
    makeCreateBookMessage
};
