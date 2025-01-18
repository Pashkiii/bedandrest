export function syncDateToMoscow(date = new Date) {
    return new Date(
        (typeof date === "string" ? new Date(date) : date).toLocaleString(
            "en-US",
            { timeZone: 'Europe/Moscow' }
        )
    );
}

export function convertDateToUtcTimezone(date) {
    const d = new Date(date);
    
    return `${d.toISOString().split('T')[0]} 00:00:00+00`;
}

export function convertDateTimeToUtcTimezone(date) {
    const d = new Date(date);
    const [dateStr, timeStr] = d.toISOString().split('T');

    return `${dateStr} ${timeStr.split('.')[0]}+00`;
}
