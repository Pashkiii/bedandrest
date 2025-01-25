import { Supabase } from './base.js';

class ApartmentDb extends Supabase {
    constructor() {
        super();
        this.table = 'apartments';
    }

    async getAll() {
        const { error, count, data: apartments } = await this.client
            .from(this.table)
            .select();

        return { error, apartments };
    }

    async getApartmentList() {
        const { error, count, data } = await this.client
            .from(this.table)
            .select()
            .eq('archive', false);

        return [error, data];
    }

    async getArchiveApartmentsList() {
        const { error, count, data, status } = await this.client
            .from(this.table)
            .select()
            .eq('archive', false);
    }

    async getById(apartmentId) {
        const { error, data } = await this.client
            .from(this.table)
            .select()
            .eq('id', apartmentId);

        return [error, data?.[0] || null];
    }

    async updateApartment(apartmentId, apartmentUpdate) {
        const { error, data: apartmentsDto,emt } = await this.client
          .from(this.table)
          .update(apartmentUpdate)
          .eq('id', apartmentId)
          .select();

        return { error, apartmentsDto };
    }
}

const apartmentDb = new ApartmentDb();

export { apartmentDb };
