import { CryptoId } from '../crypto-id.js';

export class Apartment {
	constructor(apartment) {
		this.id = apartment.id;
		this.address = apartment.address;
		this.ads = apartment.ads;
		this.linens = apartment.linens;
		this.inHour = apartment.inHour;
		this.outHour = apartment.outHour;
		this.deposit = apartment.deposit;
		this.thingsLink = apartment.thingsLink;
		this.mapPoint = apartment.mapPoint;
		this.archive = apartment.archive;
	}

	static fromApartmentDto(apartmentDto) {
		return new Apartment({
			id: apartmentDto['id'],
			address: apartmentDto['address'],
			ads: apartmentDto['ads'],
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
	const apartment = {
		mapLink: {
			value: `https://bedandrest.vercel.app/apt/${CryptoId.encode(apartmentModel.id)}`,
		},
		wifiLink: {
			value: `https://bedandrest.vercel.app/wifi/${CryptoId.encode(apartmentModel.id)}`,
		},
	};

	const getErrorByPath = (path, errors) => {
		return errors.find((error) => error.path === path);
	};

	for (const key in apartmentModel) {
		apartment[key] = {
			value: apartmentModel[key],
			error: getErrorByPath(key, errors) || null,
		};
	}

	return apartment;
}
