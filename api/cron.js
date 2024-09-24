import { confirmBooking } from '../model/book.js';
const { log } = require('../model/logger/index.js');

export async function GET(request) {
    try {
        await confirmBooking();
    } catch (error) {
        await log(['Start job error', error]);
    }
    return new Response(`Hello from ${process.env.VERCEL_REGION}`);
}