import { createContract } from './create-contract.js';
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
		const url = 'https://api.doki.online/external/contract';

		try {
			const response = await fetch('https://api.doki.online/external/contract', {
				method: 'POST',
				headers: this.#getHeaders(),
				body: JSON.stringify(contract)
			});
			const result = await response.json();

			if (!response.ok) {
				await log([
					'OkiDoki send contract error',
					`Response status: ${response.status}`,
					`error: ${response.error}.`,
					`contract: ${JSON.stringify(contract)}`
				], { type: 'ERROR' });

				return {
					done: false,
					status: response.status,
					error: response.error,
				};
			}

			return {
				done: true,
				status: result?.status?.['internal_id'] ?? 0,
				link: result?.link ?? null,
				result,
			};
		} catch (error) {
			await log(`ERROR. OkiDoki send contract error. API: ${url} error: ${error.name}, ${error.message}`);

			return {
				error,
				done: false,
			};
		}
	}

	#getHeaders() {
		const headers = {};

		headers['Content-Type'] = 'application/json';

		return headers;
	}
}