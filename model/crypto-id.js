const key = parseInt(process.env.WIFI_SECURE_KEY || '', 10) || 0;

export class CryptoId {
	/**
	 * @param {number} value
	 * @returns {string}
	 */
	static encode(value) {
		const numStr = value.toString();
		let encryptedNumStr = "";
		let keyIndex = 0;

		for (let i = 0; i < numStr.length; i++) {
			const digit = parseInt(numStr[i]);
			const keyDigit = key.charCodeAt(keyIndex % key.length) % 10; // Используем код ASCII символа из ключа по модулю 10
			const encryptedDigit = (digit + keyDigit) % 10;
			encryptedNumStr += encryptedDigit;
			keyIndex++;
		}

		return encryptedNumStr;
	}

	/**
	 * @param {string} code
	 * @returns {number}
	 */
	static decode(code) {
		const numStr = code.toString();
		let decryptedNumStr = "";
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