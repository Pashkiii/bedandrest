document.addEventListener('DOMContentLoaded', function () {
	const HIDDEN = 'hidden';

	function parseApartment(e) {
		const elements = e.target.elements;

		return {
			id: parseInt(elements.id.value, 10),
			address: elements.address.value,
			ads: elements.ads.value,
			inHour: parseInt(elements.inHour.value, 10),
			outHour: parseInt(elements.outHour.value, 10),
			deposit: parseInt(elements.deposit.value, 10),
			linens: parseInt(elements.linens.value, 10),
			thingsLink: elements.thingsLink.value,
			mapPoint: elements.mapPoint.value,
		};
	}

	function toggleSpinner(show = false) {
		const spinner = document.querySelector('.spinner-border');
		if (!spinner) return;

		if (show) {
			spinner.classList.remove(HIDDEN);
		} else {
			spinner.classList.add(HIDDEN);
		}
	}

	function setPageError(error) {
		const errorAlert = document.querySelector('#error-alert');
		if (!errorAlert) {
			return;
		}

		let message = '';

		if (typeof error === 'string') {
			message = error;
		} else if (typeof error?.msg === 'string') {
			message = error.msg;
		}

		if (message) {
			errorAlert.innerText = message;
			errorAlert.classList.remove(HIDDEN);
		}
	}

	function setPageErrors(errors) {
		const form = document.querySelector('#apartment-create-form');
		if (!form) {
			return;
		}

		for (const error of errors) {
			const el = form.querySelector(`#${error.path}-error`);
			if (el) {
				el.innerText = error.msg;
			}
		}
	}

	function hideErrorAlert() {
		const errorAlert = document.querySelector('#error-alert');
		if (errorAlert) {
			errorAlert.classList.add(HIDDEN);
		}
	}

	async function sendApartment(apartment) {
		toggleSpinner(true);

		const response = await fetch('/api/apartment/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(apartment),
		});

		if (response.ok && response.status === 200) {
			const result = await response.json();
			document.location.href = `/apartments/${result.id}`;

			return;
		}

		toggleSpinner(false);

		const errorResult = await response.json();
		if (typeof errorResult === 'object' && 'error' in errorResult) {
			setPageError(errorResult?.error);

			return;
		}

		if (Array.isArray(errorResult?.errors) && errorResult?.errors.length > 0) {
			setPageErrors(errorResult?.errors);
		}
	}


	document.addEventListener('submit', async function (e) {
		e.preventDefault();

		hideErrorAlert();
		const apartment = parseApartment(e);
		await sendApartment(apartment);
	});
});