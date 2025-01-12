import { FakeMessenger } from '../model/sender/fake-messenger.js';
import { WhatsAppSender } from '../model/sender/whatsApp.js';

export class MessengerService {
	#messenger;

	constructor() {
		if (process.env.NODE_ENV === 'development') {
			this.#messenger = new FakeMessenger();
		} else {
			this.#messenger = new WhatsAppSender();
		}
	}

	async send(phone, message) {
		if (!phone) {
			return { error: 'Invalid phone number', done: false };
		}
		if (!message) {
			return { error: 'Empty message', done: false };
		}

		try {
			const { ok } = await this.#messenger.send(phone, message);
			if (ok) {
				return { done: true };
			}

			return {
				error: 'Message not sent',
				done: false,
			};
		} catch (error) {
			return {
				error: `Message not sent: ${error.name}. ${error.message}`,
				done: false,
			};
		}
	}
}