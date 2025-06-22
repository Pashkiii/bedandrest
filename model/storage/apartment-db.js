import { ApartmentModel } from '../model/apartment.js';

class ApartmentDb {
	async getAll() {
		try {
			const apartments = await ApartmentModel.findAll({ raw: true });

			return { error: null, apartments };
		} catch (error) {
			return { error, apartments: [] };
		}
	}

	async getApartmentList() {
		try {
			const apartments = await ApartmentModel.findAll({
				where: { 'archive': false },
				raw: true
			});

			return [null, apartments];
		} catch (error) {
			return [error, []];
		}
	}

	async getArchiveApartmentsList() {
		try {
			const apartments = await ApartmentModel.findAll({
				where: { 'archive': true },
				raw: true
			});

			return { error: null, apartments };
		} catch (error) {
			return { error, apartments: [] };
		}
	}

	async getById(apartmentId) {
		try {
			const apartment = await ApartmentModel.findByPk(apartmentId);

			return [null, apartment || null];
		} catch (error) {
			return [error, null];
		}
	}

	async updateApartment(apartmentId, apartmentUpdate) {
		try {
			const apartmentsDto = await ApartmentModel.update(
				apartmentUpdate,
				{
					where: { id: apartmentId },
					returning: true,
  					plain: true
				}
			);

			console.log({ apartmentsDto });

			return { error, apartmentsDto };
		} catch (error) {
			return { error, apartmentsDto: null };
		}
	}

	async createApartment(apartmentDto) {
		try {
			const apartment = await ApartmentModel.create(apartmentDto);
			
			return { error: null, apartment: apartment.dataValues };
		} catch (error) {
			return { error, apartment: null };
		}
	}
}

const apartmentDb = new ApartmentDb();

export { apartmentDb };
