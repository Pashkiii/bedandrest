import { realtyCalendarAction } from './const.js';
import { ParseDataError } from './exception.js';
import { log } from './logger/index.js';

export function parseRCData(data) {
    if (typeof data !== 'object' || !data) {
        throw new ParseDataError('Invalid format data');
    }

    const action = parseAction(data);

    const { id, clientId, clientName, amount, apartment, phone, beginDate,
        endDate, booking } = parseBooking(data.data, action);

    return {
        action,
        data: {
            id,
            clientId,
            clientName,
            amount,
            apartment,
            beginDate,
            endDate,
            phone,
            data: JSON.stringify(data.data)
        }
    };
}

function parseAction(data) {
    const action = data?.action || '';

    if (Object.values(realtyCalendarAction).includes(action)) {
        return action;
    }

    throw new ParseDataError('Invalid format data. Action not found');
}

function isObject(obj) {
    return obj && obj instanceof Object;
}

function parseApartment(data) {
    const apartment = data.apartment;
    if (!isObject(apartment) || typeof apartment.id !== 'number' || isNaN(apartment.id)) {
        log('InvalidApartment:', JSON.stringify({ apartment: data.apartment }));
        const parseError = new ParseDataError('Invalid apartment data');
        parseError.name = 'InvalidApartmentError';
        throw parseError;
    }

    return apartment;
}

function parsePhone(phoneStr = '') {
    const matches = phoneStr.match(/\d+/g);

    if (!matches.length || !matches[0]) {
        const parseError = new ParseDataError('Invalid client phone');
        parseError.name = 'InvalidClientPhoneError';
        throw parseError;
    }

    return matches.join('');
}

function parseBooking(data, action) {
    if (!isObject(data) || !('booking' in data) || !isObject(data.booking)) {
        throw new ParseDataError('Invalid format data. Booking not found');
    }

    const booking = data.booking;

    const id = booking['id'];
    const clientId = booking['client_id'];
    const amount = booking['amount'];

    const beginDate = new Date(booking['begin_date']);
    const endDate = new Date(booking['end_date']);

    const client = booking.client;
    if (!isObject(client)) {
        throw new ParseDataError('Invalid format data. Client not found');
    }

    const phone = parsePhone(client.phone);
    const clientName = client.fio || '';
    const apartment = action === realtyCalendarAction.delete ? null : parseApartment(booking);

    return {
        id,
        clientId,
        clientName,
        amount,
        apartment,
        beginDate,
        endDate,
        phone,
        booking
    };
}
