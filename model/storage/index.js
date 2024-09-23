const supabaseJs = require('@supabase/supabase-js');

const supabase = supabaseJs.createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const tableName = 'barbook';

class Storage {
    constructor() {
        this.storage = [];
    }

    async setBook(data) {
        try {
            const { error, status } = await supabase
                .from(tableName)
                .insert(data);

            if (error) {
                console.error('Supabase insert row return error', error);
            }
        } catch (error) {
            console.log('Connection to Supabase error', error);
        }
    }

    async updateBook(id, data) {
        try {
            const { error, status } = await supabase
                .from(tableName)
                .update(data)
                .eq('id', id);

            if (error) {
                console.error('Supabase update row error', error);
            }
        } catch (error) {
            console.log('Connection to Supabase error', error);
        }
    }

    async deleteBook(id) {
        const response = await supabase
            .from(tableName)
            .delete()
            .eq('id', id);

        if (response.error) {
            console.error('Supabase return error when delete row', response.error);
        }
    }

    async deleteBooks(ids) {
        try {
            const { error, status } = await supabase
                .from(tableName)
                .delete()
                .in('id', ids);

            if (error) {
                console.error('Supabase delete many return error', error);
            }
        } catch (error) {
            console.error('Supabase delete many error', error);
        }
    }

    async getBooksByBeginDate(date) {
        try {
            const nextDay = new Date(date);
            nextDay.setDate(nextDay.getDate() + 1);

            const { error, count, data, status } = await supabase
                .from(tableName)
                .select()
                .lt('begin_date', nextDay.toISOString().split('T')[0]);

            if (error) {
                console.error(`Supabase filter return error for date="${nextDay.toISOString().split('T')[0]}"`, error);
                return [];
            }

            return data;
        } catch (error) {
            console.error('Supabase filter error', error);
            return [];
        }
    }
}

module.exports = {
    Storage
};
