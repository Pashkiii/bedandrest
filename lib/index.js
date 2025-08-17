export function syncDateToMoscow(date = new Date) {
	return new Date(
		(typeof date === "string" ? new Date(date) : date).toLocaleString(
			"en-US",
			{ timeZone: 'Europe/Moscow' }
		)
	);
}

export function convertToPostgresTime(date) {
	return new Date(date.getTime() + (1000 * 60 * (-(new Date()).getTimezoneOffset()))).toISOString().replace('T', ' ').replace('Z', '');
}

export function convertDate(date, dateTimeFormatOptions = null) {
	const formatter = new Intl.DateTimeFormat('ru-RU', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		...dateTimeFormatOptions
	});

	return formatter.format(date);
}

/**
 * @param {Date} date1
 * @param {Date} date2
 */
export function compareDates(date1, date2) {
	const date1LocaleDateStr = date1.toLocaleDateString();
	const date2LocaleDateStr = date2.toLocaleDateString();

	return date1LocaleDateStr === date2LocaleDateStr;
}

export function isObject(obj) {
	return typeof obj === 'object' && obj instanceof Object && !Array.isArray(obj);
}

/**
 * @param {string[]} rawHeaders
 */
export function joinRawHeaders(rawHeaders) {
	const headers = {};
	for (let i = 0; i < rawHeaders.length; i += 2) {
		if (!rawHeaders[i]) {
			return headers;
		}

		headers[rawHeaders[i]] = rawHeaders[i + 1];
	}

	return headers;
}