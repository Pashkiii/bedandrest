const key = parseInt(process.env.WIFI_SECURE_KEY || '', 10) || 0;

export class CryptoId {
	/**
	 * @param {number} value
	 * @returns {string}
	 */
	static encode(value) {
		const code = value + key;

		return code.toString();
	}

	/**
	 * @param {string} code
	 * @returns {number}
	 */
	static decode(code) {
		const value = parseInt(code, 10);

		return value - key;
	}
}