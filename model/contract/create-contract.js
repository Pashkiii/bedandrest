import { convertDate } from '../../lib/index.js';

export function createContract(booking, apartment) {
	if (!apartment) {
		return null;
	}

	return {
		'api_key': process.env.OKI_DOKI_API_KEY,
		'template_id': process.env.OKI_DOKI_TEMPLATE_ID,
		'external_id': booking.id,
		entities: [
			getAddress(apartment),
			getInDate(booking),
			getOutDate(booking),
			getInTime(apartment),
			getOutTime(apartment),
			getDeposit(apartment),
			getAmount(booking),
			getPricePerDay(booking),
			getLinenCount(apartment),
			getLinkOnThings(apartment),
		]
	};
}

function parseBookingData(bookingModel) {
	const data = JSON.parse(bookingModel.data);
	return data?.data;
}

const createEntity = (keyword, value) => {
	return { keyword, value };
}

function getAddress(apartment) {
	return createEntity('Описание и адрес квартиры', apartment.address);
}

function getInDate(booking) {
	return createEntity('Дата заселения', convertDate(new Date(booking.beginDate)));
}

function getOutDate(booking) {
	return createEntity('Дата выселения', convertDate(new Date(booking.endDate)));
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

function getAmount(booking) {
	const data = parseBookingData(booking);
	const amount = data?.booking?.['amount'];

	return createEntity('Полная стоимость', amount);
}

function getPricePerDay(booking) {
	const data = parseBookingData(booking);
	const pricePerDay = parseInt(data?.booking?.['price_per_day'], 10) ?? 0;

	return createEntity('Цена в сутки', pricePerDay);
}

function getLinenCount(apartment) {
	return createEntity('Количество комплектов белья', apartment.linens);
}

function getLinkOnThings(apartment) {
	return createEntity('Ссылка на фотографии', apartment.thingsLink);
}
