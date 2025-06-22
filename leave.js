import dotenv from 'dotenv';
import { log } from './model/logger/index.js';
import { leaveBooking } from './application/leave-booking.js';

dotenv.config({
    path: '../.env'
});

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
