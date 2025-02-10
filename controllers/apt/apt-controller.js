import { CryptoId } from '../../model/crypto-id.js';
import { ApartmentService } from '../../services/apartment/apartment-service.js';

export class AptController {
	static async getApt(request, response) {
		const apartmentCode = request.params.id;
		if (!apartmentCode) {
			response.sendStatus(404);

			return;
		}

		const apartmentId = CryptoId.decode(apartmentCode);
		if (isNaN(apartmentId)) {
			response.sendStatus(404);

			return;
		}

		const apartment = await ApartmentService.getApartmentById(apartmentId);
		response.render('apt.hbs', {
			layout: false,
			apartment: {
				mapPoint: apartment?.mapPoint || null,
			},
		});
	}
}