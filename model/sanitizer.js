const map = {
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	'"': '&quot;',
	'\'': '&#x27;',
	'/': '&#x2F;',
};
const map2 = {
	'&amp;': '&',
	'&lt;': '<',
	'&gt;': '>',
	'&quot;': '"',
	'&#x27;': '\'',
	'&#x2f;': '/',
	'&#x5c;': '\\',
};

export class Sanitizer {
	static sanitize(value) {
		const reg = /[&<>"'/]/ig;
		return value.replace(reg, (match)=>(map[match]));
	}

	static desanitize(value) {
		const reg = /&(amp|lt|gt|quot|#x27|#x2f|#x5c);/ig;

		return value.replaceAll(reg, (match) => (map2[match.toLowerCase()]));
	}
}

const foo = function(value) {
	const map2 = {
		'&amp;': '&',
		'&lt;': '<',
		'&gt;': '>',
		'&quot;': '"',
		'&#x27;': '\'',
		'&#x2f;': '/',
		'&#x5c;': '\\',
	};
	const reg = /&(amp|lt|gt|quot|#x27|#x2f|#x5c);/ig;

	return value.replaceAll(reg, (match) => {
		console.log(match);
		return map2[match.toLowerCase()];
	});
}
