import dotenv from 'dotenv';
import { realtyCalendarAction } from '../model/const.js';
import { createBook, updateBook, deleteBook } from '../model/book.js';
import { parseRCData } from '../model/parse-rc-data.js';
import { log } from '../model/logger/index.js';
import { ParseDataError } from '../model/exception.js';

import express, { json } from 'express';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const jsonParser = json();

app.get("/", (req, res) => res.send("Express on Vercel"));


app.post('/api/book', jsonParser, async (req, res) => {
    try {
        const { action, data } = parseRCData(req.body);

        if (action === realtyCalendarAction.delete) {
            await deleteBook(data);
            return;
        }

        switch (action) {
            case (realtyCalendarAction.create):
                await createBook(data);
                break;
            case realtyCalendarAction.update:
                await updateBook(data);
                break;
            default:
                console.error('Action not found');
        }
    } catch (error) {
        console.error(error);

        if (error instanceof ParseDataError) {
            await log(["ParseDataError", JSON.stringify(req.body), JSON.stringify(error)]);
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
