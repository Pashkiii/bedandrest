export class Booking {
    constructor(booking) {
        this.id = booking.id;
        this.apartmentId = booking.apartmentId;
    }
}

function getLocalDateString(date) {
    const intl = new Intl.DateTimeFormat('ru-RU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
    return intl.format(new Date(date));
}

export function createBookingViewModel(booking) {
    return {
        id: booking.id,
        realtyBookingLink: `https://realtycalendar.ru/chessmate/event/${booking.id}`,
        apartmentId: booking.apartmentId,
        beginDate: getLocalDateString(booking.beginDate),
        endDate: getLocalDateString(booking.endDate),
        client: {
            id: booking.clientId,
            name: booking.clientName,
            tel: booking.phone ? `+${booking.phone}` : '',
        },
        createDate: getLocalDateString(booking.createDate),
    }
}

export function createBookingPageViewModel(bookingModel, apartmentModel = null) {
    const apartment = {
        id: bookingModel.apartmentId,
    };
    if (apartmentModel) {
        Object.assign(apartment, {
            address: apartmentModel.address,
        });
    }

    const client = {
        id: bookingModel.clientId,
        name: bookingModel.clientName,
        tel: bookingModel.phone ? `+${bookingModel.phone}` : '',
    };

    return {
        id: bookingModel.id,
        realtyBookingLink: `https://realtycalendar.ru/chessmate/event/${bookingModel.id}`,
        apartment,
        beginDate: getLocalDateString(bookingModel.beginDate),
        endDate: getLocalDateString(bookingModel.endDate),
        client,
        createDate: getLocalDateString(bookingModel.createDate),
        firstMessageSent: Boolean(bookingModel.firstMessageSent),
        secondMessageSent: Boolean(bookingModel.secondMessageSent),
        thirdMessageSent: Boolean(bookingModel.thirdMessageSent),
    };
}

export function extractBookingData(data) {
    const bookingData = JSON.parse(data);

    if (typeof bookingData === 'string') {
        return extractBookingData(bookingData);
    }

    return bookingData;
}

export function convertBookingDto(bookingDto) {
    return {
        id: bookingDto.id,
        apartmentId: bookingDto['apartment_id'],
        clientId: bookingDto['client_id'],
        clientName: bookingDto['client_name'],
        beginDate: bookingDto['begin_date'],
        endDate: bookingDto['end_date'],
        phone: bookingDto['phone'],
        createDate: bookingDto['create_date'],
        data: bookingDto['data'],
        firstMessageSent: Boolean(bookingDto['first_message_sended']),
        secondMessageSent: Boolean(bookingDto['second_message_sended']),
        thirdMessageSent: Boolean(bookingDto['third_message_sended']),
    }
}
