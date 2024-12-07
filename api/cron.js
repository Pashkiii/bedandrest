import dotenv from 'dotenv';
import { confirmBookings } from '../model/book.js';
import { log } from '../model/logger/index.js';

dotenv.config();

export async function GET(request) {
    try {
        await confirmBookings();
    } catch (error) {
        await log(['Start job error', JSON.stringify(error)].join(' '));
    }
    return new Response(`Hello from ${process.env.VERCEL_REGION}`);
}
