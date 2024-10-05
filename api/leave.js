require('dotenv').config();

const { leaveBook } = require('../model/book.js');
const { log } = require('../model/logger/index.js');

export async function GET(request) {
    try {
        await leaveBook();
    } catch (error) {
        await log(['Start job error', error]);
    }
    return new Response(`Hello from ${process.env.VERCEL_REGION}`);
}
