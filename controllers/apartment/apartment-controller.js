import { validationResult } from 'express-validator';
import { ApartmentService } from '../../services/apartment/apartment-service.js';
import { ApartmentActionsService } from '../../services/apartment/apartment-actions-service.js';
import { toApartmentView } from '../../model/apartment/apartment.js';

export class ApartmentController {
	static async getApartments() {
		try {
			const apartments = await ApartmentService.getApartmentsList();
			if (!apartments || !Array.isArray(apartments)) {
				return apartments;
			}

			return apartments.map((apartment) => toApartmentView(apartment));
		} catch (error) {
			return [];
		}
	}

	static async getApartment(apartmentId) {
		try {
			const apartment = await ApartmentService.getApartmentById(apartmentId);
			if (!apartment) {
				return null;
			}

			return toApartmentView(apartment);
		} catch (error) {
			return null;
		}
	}

	async getArchiveList() {

	}

	static async addApartment(request, response) {
		const apartmentId = parseInt(request.body.id, 10);
		if (!apartmentId) {
			response.status(400).send({
				error: 'Invalid apartment id',
			});

			return;
		}

		const result = validationResult(request);
		if (result?.errors?.length > 0) {
			response.status(400).send({
				errors: result.errors,
			});

			return;
		}

		const { error, apartment } = await ApartmentActionsService.createApartment(request.body);
		if (!apartment) {
			response.status(400).send({
				error: error || { status: 1, msg: 'Не удалось создать квартиру' },
			});

			return;
		}

		response.status(200).send(apartment);
	}

	static async updateApartment(request, response) {
		const apartmentId = parseInt(request.params.id, 10);
		if (!apartmentId) {
			response.send(404);

			return;
		}

		const result = validationResult(request);

		if (result?.errors?.length > 0) {
			const apartmentViewModel = toApartmentView({
				id: apartmentId,
				...request.body,
			}, result?.errors || []);
			response.render('apartment.hbs', {
				apartment: apartmentViewModel
			});

			return;
		}

		const apartment = await ApartmentActionsService.updateApartment({
			id: apartmentId,
			...request.body,
		});

		if (!apartment) {
			response.render('apartment.hbs', {
				apartment: toApartmentView({
					id: apartmentId,
					...request.body,
				}),
				error: 'Не удалось сохранить изменения',
			});

			return;
		}

		response.render('apartment.hbs', {
			apartment: toApartmentView(apartment),
		});
	}

	async toArchiveApartment(id) {

	}
}