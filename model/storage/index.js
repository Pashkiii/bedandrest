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

            console.log('Supabase insert row status:', status);

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

            console.log('Supabase update row status:', status);

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

        console.log('Supabase delete response status', response.status);

        if (response.error) {
            console.error('Supabase return error when delete row', response.error);
        }
    }
}

module.exports = {
    Storage
};
