import {createClient} from '@supabase/supabase-js';

let client = null;

export class Supabase {
    constructor() {
        if (client === null) {
            client = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
        }

        this.client = client;
    }
}
