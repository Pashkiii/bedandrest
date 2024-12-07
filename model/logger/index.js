import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
const tableName = 'log';

async function insertLog(message) {
    try {
        const { error } = await supabase
            .from(tableName)
            .insert({ 
                message,
            });

        if (error) {
            console.error('Supabase logger return error', error)
        }
    } catch (error) {
        console.log("Supabase logger error", error);
    }
}

function getMessage(logData) {
    if (logData instanceof Error) {
        return `${logData.name}: ${logData.message}`;
    }

    return Array.isArray(logData) ? logData.join("") : logData;
}

export async function log(message) {
    const d = new Date();
    const data = `${d.toLocaleString("ru-RU")}: ${getMessage(message)} \n`;

    if (process.env.NODE_ENV === 'development') {
        console.log(`${d.toLocaleString("ru-RU")}: ${getMessage(message)} \n`);
        return;
    }

    try {
        await insertLog(data);
    } catch (error) {
        console.log("Logger error", error);
    }
}
