import { ApartmentService } from "../../services/apartment/apartment-service.js";

export class ApartmentController {
    static async getApartments() {
        try {
            return await ApartmentService.getApartmentsList();
        } catch (error) {
            return [];
        }
    }

    static async getApartment(apartmentId) {
        try {
            return await ApartmentService.getApartmentById(apartmentId);
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