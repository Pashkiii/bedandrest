import { ApartmentService } from "../../services/apartment/apartment-service.js";
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

    async addApartment() {

    }

    async updateApartment() {

    }

    async toArchiveApartment(id) {

    }
}