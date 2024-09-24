require('dotenv').config();

const { realtyCalendarAction } = require('../model/const.js');
const { createBook, updateBook, deleteBook } = require('../model/book.js');
const { parseRCData } = require('../model/parse-rc-data.js');
const { log } = require('../model/logger/index.js');
const { ParseDataError } = require('../model/exception.js');
const favicon = require('serve-favicon');

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const jsonParser = express.json();

app.use(favicon(__dirname + '/public/favicon.ico'));

app.get("/", (req, res) => res.send("Express on Vercel"));

app.post('/api/book', jsonParser, async (req, res) => {
    try {
        const { action, data } = parseRCData(req.body);

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
