require('dotenv').config();

const { realtyCalendarAction } = require('../model/const.js');
const { confirmBooking, createBook, updateBook, deleteBook } = require('../model/book.js');
const { parseRCData } = require('../model/parse-rc-data.js');
const { log } = require('../model/logger/index.js');

const cron = require('cron')
const CronJob = cron.CronJob;

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const jsonParser = express.json();

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
        log(JSON.stringify(error));
    } finally {
        res.sendStatus(200);
    }
});

app.listen(port, () => {
    const job = CronJob.from({
        cronTime: '10 18 * * * *',
        start: true,
        timeZone: 'Europe/Moscow',
        onTick: async function() {
            console.error('Tick start');
            await confirmBooking();
        }
    });

    console.log('Start app in port:', port);
});
