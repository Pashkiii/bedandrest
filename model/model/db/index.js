import { supabase, tableName } from './supabase.js';
import { log } from '../../logger/index.js';

export class DB {
    static async setBook(data) {
        try {
            const { error, status } = await supabase
                .from(tableName)
                .insert(data);

            if (error) {
                console.error('Supabase insert row return error', error);
                void log('Supabase insert row return error', error);
            }
        } catch (error) {
            console.log('Connection to Supabase error', error);
        }
    }

    static async updateBook(id, data) {
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

    /**
     * @param {number} bookId 
     */
    static async setSecondMessageSended(bookId) {
        const data = {
            'second_message_sended': true
        };

        try {
            const { error, status } = await supabase
                .from(tableName)
                .update(data)
                .eq('id', bookId);

            if (error) {
                console.error('Supabase update row error', error);
            }
        } catch (error) {
            console.error('Connection to Supabase error', error);
        }
    }

    /**
     * @param {number[]} bookIds id бронирований
     */
    static async setSecondMessageSendedMany(bookIds) {
        const data = bookIds.map((id) => ({
            id,
            'second_message_sended': true
        }));

        try {
            const { error, status } = await supabase
                .from(tableName)
                .upsert(data)
                .select();

            if (error) {
                console.error('Supbase return error when set second msg complete', error);
            }
        } catch (error) {
            console.error('Supabase. Update second message flag');
        }
    }

    /**
     * @param {number} id 
     */
    static async deleteBook(id) {
        try {
            const response = await supabase
                .from(tableName)
                .delete()
                .eq('id', id);

            if (response.error) {
                console.error('Supabase return error when delete row', response.error);
            }
        } catch (error) {
            console.error('Connection to Supabase error', error);
        }
    }

    /**
     * @param {number[]} ids id бронирований
     */
    static async deleteBooks(ids) {
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

    static async getBooksByBeginDate(date) {
        try {
            const beginDate = convertDateToUtcTimezone(date);

            const { error, count, data, status } = await supabase
                .from(tableName)
                .select()
                .eq('begin_date', beginDate);

            if (error) {
                console.error(`Supabase filter return error for date="${beginDate}"`, error);
                return [];
            }

            return data;
        } catch (error) {
            console.error('Supabase filter error', error);
            return [];
        }
    }

    static async getBooksByEndDate(date) {
        try {
            const endDate = convertDateToUtcTimezone(date);
            const { error, count, data, status } = await supabase
                .from(tableName)
                .select()
                .eq('end_date', endDate);

            if (error) {
                console.error(`Supabase filter (end_date) return error for date="${endDate}"`, error);
                return [];
            }

            return data;
        } catch (error) {
            console.error('Supabase filter by end error', error);
            return [];
        }
    }
}
