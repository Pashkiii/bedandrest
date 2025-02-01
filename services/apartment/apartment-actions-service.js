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

	static async createApartment(apartment) {
		const apartmentCreateDto = apartmentCreateDtoMapper(apartment);
		const { error, data } = await apartmentDb.createApartment(apartmentCreateDto);

		if (error) {
			await log([
				`ERROR`,
				`ApartmentActionsService`,
				`Create apartment error`,
				`Error ${error.name}: ${JSON.stringify(error)}`,
				`ApartmentUpdate: ${JSON.stringify(apartment)}`,
			]);

			return handleCreateApartmentError(error);
		}

		if (!Array.isArray(data)) {
			await log([
				'ERROR',
				'ApartmentActionsService',
				'Create apartment error',
				`apartments not array: ${data}`
			]);

			return { apartment: null };
		}

		if (data.length === 0) {
			await log([
				'ERROR',
				'ApartmentActionsService',
				'Create apartment error',
				`apartmentsDto is empty: ${data}`
			]);

			return { apartment: null };
		}

		return {
			apartment: Apartment.fromApartmentDto(data[0])
		};
	}
}

function handleCreateApartmentError(err) {
	let error = {
		status: 1,
		msg: 'Не удалось создать квартиру',
	};

	if (err?.code === '23505') {
		error = {
			status: 23505,
			msg: 'Квартира с таким ID уже существует',
		};
	} else if ('code' in err) {
		error = {
			status: err.code,
			msg: err?.details || 'Не удалось создать квартиру',
		};
	}

	return {
		error,
		apartment: null,
	};
}

function apartmentCreateDtoMapper(apartment) {
	const apartmentCreateDto = {};

	Object.keys(apartment)
		.filter((key) => key in apartmentCreateMap)
		.forEach((key) => {
			apartmentCreateDto[apartmentCreateMap[key]] = apartment[key];
		});

	return apartmentCreateDto;
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

const apartmentUpdateMap = Object.freeze({
	'ads': 'ads',
	'address': 'address',
	'linens': 'linens',
	inHour: 'in_hour',
	outHour: 'out_hour',
	deposit: 'deposit',
	thingsLink: 'things_link',
});

const apartmentCreateMap = Object.freeze({
	'id': 'id',
	...apartmentUpdateMap,
});
