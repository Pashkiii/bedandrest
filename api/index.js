import express from 'express';
import dotenv from 'dotenv';
import { realtyCalendarAction } from '../model/const.js';
import { createBook, updateBook, deleteBook } from '../model/book.js';
import { parseRCData } from '../model/parse-rc-data.js';
import { log } from '../model/logger/index.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const jsonParser = express.json();

app.get("/", (req, res) => res.send("Express on Vercel"));

app.post('/api/book', jsonParser, async (req, res) => {
    try {
        const { action, data } = parseRCData(req.body);

        log('Action: ' + action + JSON.stringify(data));

        if (data.apartment.id !== 219768) {
            return;
        }

        switch (action) {
            case (realtyCalendarAction.create):
                await createBook(data);
                break;
            case realtyCalendarAction.update:
                await updateBook(data);
                break;
            case realtyCalendarAction.delete:
                await deleteBook(data);
                break;
            default:
                console.error('Action not found');
        }
    } catch (error) {
        console.log(error);
        log(JSON.stringify(error));
    } finally {
        res.sendStatus(200);
    }
});

app.listen(port, () => {
    console.log('Start app in port:', port);
});


export default app;