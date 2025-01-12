export class FakeMessenger {
	send(phone, message) {
		return new Promise((resolve) => {
			setTimeout(() => {
				console.log('Message to ' + phone);
				console.log(message);

				resolve({ ok: true });
			}, 40);
		});
	}
}