import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import * as path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path: path.resolve(__dirname, '../.env')
});

import { log } from './model/logger/index.js';
import { leaveBooking } from './application/leave-booking.js';

export async function GET() {
    try {
        await leaveBooking();
    } catch (error) {
        await log(['Start job error', error]);
    }

    return new Response(`Hello from ${process.env.VERCEL_REGION}`);
}

if (process.env.NODE_ENV === 'development') {
    await GET();
}
