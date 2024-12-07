import { createClient } from '@supabase/supabase-js';

const tableName = 'barbook';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export {
    supabase,
    tableName
};
