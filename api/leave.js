import dotenv from 'dotenv';
import { leaveBook } from '../model/book.js';
import { log } from '../model/logger/index.js';

dotenv.config();

export async function GET(request) {
    try {
        await leaveBook();
    } catch (error) {
        await log(['Start job error', error]);
    }
    return new Response(`Hello from ${process.env.VERCEL_REGION}`);
}
