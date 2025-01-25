import { apartmentDb } from '../../model/storage/apartment-db.js';
import { Apartment } from '../../model/apartment/apartment.js';
import { log } from '../../model/logger/index.js';

export class ApartmentService {
    static async getApartmentsList() {
        const [error, apartmentsDto] = await apartmentDb.getApartmentList();
        if (error) {
            await log(`ERROR. ApartmentService. Get apartment list error: ${JSON.stringify(error)}`);

            return [];
        }

        return apartmentsDto.map((apartmentDto) => {
            return Apartment.fromApartmentDto(apartmentDto);
        });
    }

    static async getArchiveApartmentsList() {
        const [error, apartmentsDto] = await apartmentDb.getArchiveApartmentsList();
        if (error) {
            await log(`ERROR. ApartmentService. Get archive apartment list error: ${JSON.stringify(error)}`);
            return [];
        }

        return apartmentsDto.map((apartmentDto) => {
            return Apartment.fromApartmentDto(apartmentDto);
        });
    }

    static async getAllApartmentsList() {
        const [error, apartmentsDto] = await apartmentDb.getAll();
        if (error) {
            await log(`ERROR. ApartmentService. Get all apartment list error: ${JSON.stringify(error)}`);

            return [];
        }

        return apartmentsDto.map((apartmentDto) => {
            return Apartment.fromApartmentDto(apartmentDto);
        });
    }

    static async getApartmentById(apartmentId) {
        const [error, apartmentDto] = await apartmentDb.getById(apartmentId);
        if (error) {
            await log(`ERROR. ApartmentService. Get apartment by ID (${apartmentId}): ${JSON.stringify(error)}`);
            return null;
        }
        if (!apartmentDto) {
            await log(`ERROR. ApartmentService. Get apartment by ID (${apartmentId}): NotFound`);
            return null;
        }

        return Apartment.fromApartmentDto(apartmentDto);
    }
}