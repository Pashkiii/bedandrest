import { CryptoId } from '../crypto-id.js';

export class Apartment {
	constructor(apartment) {
		this.id = apartment.id;
		this.address = apartment.address;
		this.linens = apartment.linens;
		this.inHour = apartment.inHour;
		this.outHour = apartment.outHour;
		this.deposit = apartment.deposit;
		this.thingsLink = apartment.thingsLink;
		this.mapPoint = apartment.mapPoint;
		this.archive = apartment.archive;
		this.mapLink = `/apt/${CryptoId.encode(apartment.id)}`;
	}

	static fromApartmentDto(apartmentDto) {
		return new Apartment({
			id: apartmentDto['id'],
			address: apartmentDto['address'],
			linens: apartmentDto['linens'],
			inHour: apartmentDto['inHour'],
			outHour: apartmentDto['outHour'],
			deposit: apartmentDto['deposit'],
			thingsLink: apartmentDto['thingsLink'],
			mapPoint: apartmentDto['mapPoint'],
			archive: apartmentDto['archive'],
		});
	}
}

export function toApartmentView(apartmentModel, errors = []) {
	const apartment = {};

	for (const key in apartmentModel) {
		apartment[key] = {
			value: apartmentModel[key],
			error: getErrorByPath(key, errors) || null,
		};
	}

	apartment.inHour.value = typeof apartmentModel.inHour === 'number' ? `${apartmentModel.inHour}:00` : apartmentModel.inHour;
	apartment.outHour.value = typeof apartmentModel.outHour === 'number' ? `${apartmentModel.outHour}:00` : apartmentModel.outHour;
	apartment.mapLink = {
		value: `/apt/${CryptoId.encode(apartmentModel.id)}`
	};
	apartment.wifiLink = {
		value: `/wifi/${CryptoId.encode(apartmentModel.id)}`
	};

	return apartment;
}

const getErrorByPath = (path, errors) => {
	return errors.find((error) => error.path === path);
};
