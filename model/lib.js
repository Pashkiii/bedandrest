function syncDateToMoscow(date = new Date) {
    return new Date(
        (typeof date === "string" ? new Date(date) : date).toLocaleString(
            "en-US",
            { timeZone: 'Europe/Moscow' }
        )
    );
}

module.exports = {
    syncDateToMoscow
}
