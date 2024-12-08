import { OkiDokiApi } from '../model/oki-doki-api.js';
import { apartmentData } from '../const.js';
import { log } from '../logger/index.js';

export async function createContractService(book) {
    const data = convertToContractData(book);
    if (!data) return null;

    const result = await OkiDokiApi.contract(data);
    if (result[0] !== null) {
        await log(['OkiDoki contract not created', JSON.stringify(result[0])].join('.'));
        return null;
    }

    return result[1]?.link || null;
}

function convertToContractData(book) {
    const apartment = apartmentData.get(book['apartment_id']);

    if (!apartment) {
        return null;
    }

    return {
        'api_key': process.env.OKI_DOKI_API_KEY,
        'template_id': process.env.OKI_DOKI_TEMPLATE_ID,
        'external_id': book.id,
        entities: [
            getAddress(apartment),
            getInDate(book),
            getOutDate(book),
            getInTime(apartment),
            getOutTime(apartment),
            getDeposit(apartment),
            getAmount(book),
            getPricePerDay(book),
            getLinenCount(apartment),
            getLinkOnThings(apartment),
        ]
    };
}

const createEntity = (keyword, value) => {
    return { keyword, value };
}

function convertDate(date) {
    const intl = new Intl.DateTimeFormat('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    return intl.format(date);
}

function getAddress(apartment) {
    return createEntity('Описание и адрес квартиры', apartment.address);
}

function getInDate(book) {
    return createEntity('Дата заселения', convertDate(new Date(book['begin_date'])));
}

function getOutDate(book) {
    return createEntity('Дата выселения', convertDate(new Date(book['end_date'])));
}

function getInTime(apartment) {
    return createEntity('Время заезда', `${apartment.inHour}:00`);
}

function getOutTime(apartment) {
    return createEntity('время выезда', `${apartment.outHour}:00`);
}

function getDeposit(apartment) {
    return createEntity('Обеспечительный платеж', apartment.deposit);
}

function getAmount(book) {
    const data = JSON.parse(book.data);
    const amount = data.booking?.['amount'];
    return createEntity('Полная стоимость', amount);
}

function getPricePerDay(book) {
    const data = JSON.parse(book.data);
    const pricePerDay = data.booking?.['price_per_day'];

    return createEntity('Цена в сутки', pricePerDay);
}

function getLinenCount(apartment) {
    return createEntity('Количество комплектов белья', apartment.linenCount);
}

function getLinkOnThings(apartment) {
    return createEntity('Ссылка на фотографии', apartment.thingsLink);
}
