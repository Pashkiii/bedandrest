import { OkiDoki } from '../model/contract/oki-doki.js';
import { log } from '../model/logger/index.js';

export class ContractService {
	async sendContract(bookingModel, apartment) {
		const okiDoki = new OkiDoki(bookingModel, apartment);
		const contract = okiDoki.createContract();
		if (!contract) {
			await log(`ERROR. ContractService. Contract for booking ${bookingModel.id} not created.`);

			return {
				done: false,
				status: 0,
			};
		}

		const { error, done, result, status } = await okiDoki.sendContract(contract);
		if (done) {
			return {
				done,
				status,
				result,
			};
		}

		await log(`ERROR. ContractService. Send contract for booking ${bookingModel.id} error: ${error.name}, ${error.message}`);

		return {
			done,
			error,
		};
	}
}