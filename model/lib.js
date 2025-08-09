export function syncDateToMoscow(date = new Date) {
    return new Date(
        (typeof date === "string" ? new Date(date) : date).toLocaleString(
            "en-US",
            { timeZone: 'Europe/Moscow' }
        )
    );
}

export function convertDateToUtcTimezone(date, converterOptions = null) {
    const options = {
        onlyDay: false,
        ...converterOptions,
    };
    const day = new Date(date).toISOString().split('T')[0]

    if (options.onlyDay) {
        return day
    }
    
    return `${day} 00:00:00+00`;
}

export function convertDateTimeToUtcTimezone(date, onlyDate = false) {
    const d = new Date(date);

    if (onlyDate) {
        return d.toISOString().split('T')[0];
    }

    return d.toISOString();
    // const [dateStr, timeStr] = d.toISOString().split('T');

    // return `${dateStr} ${timeStr.split('.')[0]}+00`;
}
