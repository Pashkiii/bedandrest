import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import * as path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path: path.resolve(__dirname, '../.env')
});

import { log } from './model/logger/index.js';
import { confirmBookings } from './application/confirm-bookings.js';

dotenv.config({
    path: '../.env'
});

export async function GET(request) {
    try {
        await confirmBookings();
    } catch (error) {
        await log(['Start job error', JSON.stringify(error)].join(' '));
    }

    return new Response(`Hello from ${process.env.VERCEL_REGION}`);
}
