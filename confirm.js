import dotenv from 'dotenv';
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
