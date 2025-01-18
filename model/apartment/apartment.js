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
		this.archive = apartment.archive;
	}

	static fromApartmentDto(apartmentDto) {
		return new Apartment({
			id: apartmentDto['id'],
			address: apartmentDto['address'],
			ads: apartmentDto['ads'],
			linens: apartmentDto['linens'],
			inHour: apartmentDto['in_hour'],
			outHour: apartmentDto['out_hour'],
			deposit: apartmentDto['deposit'],
			thingsLink: apartmentDto['things_link'],
			archive: apartmentDto['archive'],
		});
	}
}

export function toApartmentView(apartment) {
	return {
		...apartment,
		wifiLink: `https://bedandrest.vercel.app/wifi/${CryptoId.encode(apartment.id)}`,
	};
}
