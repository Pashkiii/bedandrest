export class FakeMessenger {
	send(phone, message) {
		return new Promise((resolve) => {
			setTimeout(() => {
				console.log('MESSAGE TO: ' + phone);
				console.log(message);

				resolve({ ok: true });
			}, 40);
		});
	}
}