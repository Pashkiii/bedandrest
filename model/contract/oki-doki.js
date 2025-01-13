import { createContract } from './create-contract.js'
import fetch from 'node-fetch';
import { log } from '../logger/index.js';

export class OkiDoki {
	constructor(booking, apartment) {
		this.apartment = apartment;
		this.booking = booking;
	}

	createContract() {
		return createContract(this.booking, this.apartment);
	}

	async sendContract(contract) {
		const url = this.#makeUri('contract');

		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: this.#getHeaders(),
				body: JSON.stringify(contract)
			});
			const result = await response.json();

			if (response.ok) {
				await log([
					'INFO',
					'OkiDoki',
					'CreateContract',
					`Contract: ${JSON.stringify(contract)}`,
					`Response: ${JSON.stringify(response)}`,
				].join('. '));

				return {
					done: true,
					status: result?.status ?? 0,
					result
				};
			}

			await log(`ERROR. OkiDoki send contract error. Response status: ${response.status}, error: ${response.error}.`);

			return {
				done: false,
				status: response.status,
				error: response.error,
			};
		} catch (error) {
			await log(`ERROR. OkiDoki send contract error. API: ${url} error: ${error.name}, ${error.message}`);

			return {
				error,
				done: false,
			};
		}
	}

	#makeUri(path) {
		return 'https://api.doki.online/external/' + path;
	}

	#getHeaders() {
		const headers = {};

		headers['Content-Type'] = 'application/json';

		return headers;
	}
}