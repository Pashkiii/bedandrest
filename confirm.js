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

async function main() {
    try {
        await confirmBookings();
    } catch (error) {
        await log(['Start confirm job error', JSON.stringify(error)].join(' '));
    }
}

main()
    .then(() => {})
    .catch((reject) => console.error('Confirm start rejected:', reject));
