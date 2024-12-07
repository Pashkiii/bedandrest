import dotenv from 'dotenv';
import { realtyCalendarAction } from '../model/const.js';
import { updateBook, deleteBook } from '../model/book.js';
import { parseRCData } from '../model/parse-rc-data.js';
import { log } from '../model/logger/index.js';
import { ParseDataError } from '../model/exception.js';
import { CreateBookingService } from '../model/service/create-booking-service.js';
import { DeleteBookingService } from '../model/service/delete-booking-service.js';

import express, { json } from 'express';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const jsonParser = json();

app.get("/", (req, res) => res.send("Express on Vercel"));


app.post('/api/book', jsonParser, async (req, res) => {
    try {
        void log(`Requerst from ${req.url}, ${JSON.stringify(req.headers)}`);

        const realtyCalendarData = parseRCData(req.body);
        if (!realtyCalendarData) {
            res.sendStatus(200);
            return;
        }

        const { action, statusCd, data } = realtyCalendarData;

        if (statusCd !== 5) {
            return;
        }

        if (action === realtyCalendarAction.delete) {
            await deleteBook(data);
            return;
        }

        switch (action) {
            case (realtyCalendarAction.create):
                const createBookingService = new CreateBookingService();
                await createBookingService.create(data);
                break;
            case realtyCalendarAction.update:
                await updateBook(data);
                break;
            case realtyCalendarAction.delete:
                const deleteBookingService = new DeleteBookingService();
                await deleteBookingService(data);
                break;
            default:
                console.error('Action not found');
        }
    } catch (error) {
        console.error(error);

        if (error instanceof ParseDataError) {
            await log(`ParseDataError:${JSON.stringify(error)},message: ${error.message}.Data:${JSON.stringify(req.body)}`);
        } else {
            await log(JSON.stringify(error));
        }
    } finally {
        res.sendStatus(200);
    }
});

app.listen(port, async () => {
    console.log('Start app in port:', port);
});
