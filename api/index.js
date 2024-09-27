require('dotenv').config();

const { realtyCalendarAction } = require('../model/const.js');
const { createBook, updateBook, deleteBook } = require('../model/book.js');
const { parseRCData } = require('../model/parse-rc-data.js');
const { log } = require('../model/logger/index.js');
const { ParseDataError } = require('../model/exception.js');

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const jsonParser = express.json();

app.get("/", (req, res) => res.send("Express on Vercel"));

const permittedApartments = [
    31629,
    31618,
    193112,
    72654,
    155176,
    219768
];

app.post('/api/book', jsonParser, async (req, res) => {
    try {
        const { action, data } = parseRCData(req.body);

        if (action === realtyCalendarAction.delete) {
            await deleteBook(data);
            return;
        }

        if (!permittedApartments.includes(data.apartment.id)) {
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
