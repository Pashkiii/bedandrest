import { apartmentDb } from '../../model/storage/apartment-db.js';
import { Apartment } from '../../model/apartment/apartment.js';
import { log } from '../../model/logger/index.js';

export class ApartmentActionsService {
	static async updateApartment(apartment) {
		const apartmentUpdateDto = apartmentUpdateDtoMapper(apartment);
		const { error, apartmentsDto } = await apartmentDb.updateApartment(apartment.id, apartmentUpdateDto);
		if (error) {
			await log([
				`ERROR`,
				`ApartmentActionsService`,
				`Update apartment error`,
				`Error ${error.name}: ${JSON.stringify(error)}`,
				`ApartmentUpdate: ${JSON.stringify(apartment)}`,
			]);

			return null;
		}
		if (!Array.isArray(apartmentsDto)) {
			await log([
				'ERROR',
				'ApartmentActionsService',
				'Update apartment error',
				`apartments not array: ${apartmentsDto}`
			]);

			return null;
		}
		if (apartmentsDto.length === 0) {
			await log([
				'ERROR',
				'ApartmentActionsService',
				'Update apartment error',
				`apartmentsDto is empty: ${apartmentsDto}`
			]);

			return null;
		}

		const apartmentDto = apartmentsDto[0];

		return Apartment.fromApartmentDto(apartmentDto);
	}
}

function apartmentUpdateDtoMapper(apartment) {
	const apartmentUpdateDto = {};

	Object.keys(apartment)
		.filter(key => key !== 'id' && key !== 'wifiLink' && key in apartmentUpdateMap)
		.forEach(key => {
			apartmentUpdateDto[apartmentUpdateMap[key]] = apartment[key];
		});

	return apartmentUpdateDto;
}

const apartmentUpdateMap = {
	'abs': 'abs',
	'address': 'address',
	'linens': 'linens',
	inHour: 'in_hour',
	outHour: 'out_hour',
	deposit: 'deposit',
	thingsLink: 'things_link',
};
