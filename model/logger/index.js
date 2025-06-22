import { LogModel } from '../model/log.js';

async function insertLog(message) {
    try {
        await LogModel.create(message);
    } catch (error) {
        console.log("DB logger error", error);
    }
}

function getMessage(logData, options) {
    if (Array.isArray(logData)) {
        return logData.join(options?.separator || '. ');
    }
    if (logData instanceof Error) {
        return `${logData.name}: ${logData.message}`;
    }

    return logData.toString();
}

/**
 *
 * @param {string|string[]} message
 * @param {{separator?: string, type?: string}} options
 * @param {string} type
 * @return {Promise<void>}
 */
export async function log(message, options = {}, type = null) {
    const d = new Date();
    const data = `${d.toLocaleString("ru-RU")}: ${getMessage(message, options)} \n`;

    if (process.env.NODE_ENV === 'development') {
        console.log(`${d.toLocaleString("ru-RU")}: ${getMessage(message, options)} \n`);
        return;
    }

    try {
        await insertLog({
            type: options?.type || type,
            message: data
        });
    } catch (error) {
        console.log("Logger error", error);
    }
}
