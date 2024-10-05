function syncDateToMoscow(date = new Date) {
    return new Date(
        (typeof date === "string" ? new Date(date) : date).toLocaleString(
            "en-US",
            { timeZone: 'Europe/Moscow' }
        )
    );
}

function convertDateToUtcTimezone(date) {
    const d = new Date(date);
    
    return `${d.toISOString().split('T')[0]} 00:00:00+00`;
}

module.exports = {
    syncDateToMoscow,
    convertDateToUtcTimezone
}
