import { joinRawHeaders, syncDateToMoscow } from '../../lib/index.js';
import { CryptoId } from '../../model/crypto-id.js';
import { checkBookingByWifi } from '../../application/check-booking-by-wifi.js';
import { addToWifiJournal } from '../../application/add-to-wifi-journal.js';

export class WifiController {
	async getApartmentWiFi(request, response) {
		const apartmentCode = request.params.id;
		if (!apartmentCode) {
			response.sendStatus(404);

			return;
		}

		const wifiApartmentId = CryptoId.decode(apartmentCode);
		if (isNaN(wifiApartmentId)) {
			response.sendStatus(404);

			return;
		}

		const today = syncDateToMoscow(new Date());
		const { error, apartment, bookingId } = await checkBookingByWifi(wifiApartmentId, today);

		if (!apartment) {
			response.sendStatus(404);

			return;
		}

		await addToWifiJournal({
			apartmentId: apartment.id,
			bookingId,
			createDate: today,
			data: JSON.stringify(joinRawHeaders(request.rawHeaders || [])),
		});

		response.render('wifi.hbs', {
			wifiName: process.env.WIFI_NAME,
			password: process.env.WIFI_PASSWORD,
			layout: false,
		});
	}
}