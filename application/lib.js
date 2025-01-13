import { CreateBookMessageCreator } from '../model/message/createBookMessageCreator.js';
import { MessengerService } from '../services/messenger-service.js';
import { ContractService } from '../services/contract-service.js';
import { ConfirmBookMessageCreator } from '../model/message/confirmBookMessageCreator.js';
import { log } from '../model/logger/index.js';

export async function sendFirstMessage(bookingModel, apartment) {
	if (!bookingModel.phone) {
		return { done: false };
	}

	const firstMessageWriter = new CreateBookMessageCreator(apartment);
	const firstMessage = firstMessageWriter.write();
	const messengerService = new MessengerService();
	const { error, done } = await messengerService.send(bookingModel.phone, firstMessage);

	return { done };
}

export async function sendSecondMessage(bookingModel, apartment) {
	if (!bookingModel.phone) {
		return { done: false };
	}

	const messengerService = new MessengerService();
	const contractService = new ContractService();
	const sendContractResult = contractService.sendContract(bookingModel, apartment);
	if (!sendContractResult.done || !sendContractResult.status) {
		await log([
				'WARN',
				'SendSecondMessage',
				'Contract link not created',
				`ContractResult: ${JSON.stringify(sendContractResult)}`,
				`BookingModel: ${JSON.stringify(bookingModel)}`,
				`Apartment: ${JSON.stringify(apartment)}`,
			].join('. ')
		);

		const managerTel = process.env.MANAGER_PHONE;
		const link = sendContractResult?.result?.link || null;
		await messengerService.send(managerTel, `
				Внимание! Проблема с отправкой договора OkiDoki, проверьте данные и отправьте договор вручную.
				Бронирование https://realtycalendar.ru/chessmate/event/${bookingModel.id}

				${link ? 'Ссылка на договор: ' + link : ''}
		`);
	}

	const secondMessage = (new ConfirmBookMessageCreator({
		book: bookingModel,
		contractLink: sendContractResult.status > 0 ? sendContractResult?.result?.link || null : null,
	})).makeMessage();
	const { done } = await messengerService.send(bookingModel.phone, secondMessage);

	return { done };
}