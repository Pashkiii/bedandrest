export class CryptoId {
	/**
	 * @param {number} value
	 * @returns {string}
	 */
	static encode(value) {
		const key = process.env.WIFI_SECURE_KEY || '';

		const numStr = value.toString();
		let encryptedNumStr = ''

		for (let i = 0; i < numStr.length; i++) {
			const digit = parseInt(numStr[i]);
			const keyDigit = key.charCodeAt(i % key.length) % 10; // Используем код ASCII символа из ключа по модулю 10
			const encryptedDigit = (digit + keyDigit) % 10;
			encryptedNumStr += encryptedDigit;
		}

		return encryptedNumStr;
	}

	/**
	 * @param {string} code
	 * @returns {number}
	 */
	static decode(code) {
		const key = process.env.WIFI_SECURE_KEY || '';

		const numStr = code.toString();
		let decryptedNumStr = '';
		let keyIndex = 0;

		for (let i = 0; i < numStr.length; i++) {
			const digit = parseInt(numStr[i]);
			const keyDigit = key.charCodeAt(keyIndex % key.length) % 10;
			const decryptedDigit = (digit - keyDigit + 10) % 10;
			decryptedNumStr += decryptedDigit;
			keyIndex++;
		}

		return parseInt(decryptedNumStr);
	}
}
