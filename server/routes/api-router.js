import { Router, json } from 'express';
import { ApiBookingController } from '../../controllers/api/api-booking-controller.js';
import { BookingController } from '../../controllers/booking/booking-controller.js';
import { ApartmentController } from '../../controllers/apartment/apartment-controller.js';
import { log } from '../../model/logger/index.js';

const jsonParser = json();
const apiRouter = Router();

apiRouter.post('/book', jsonParser, async (req, res) => {
    try {
        const realtyCalendarBookingData = req.body;
        const controller = new ApiBookingController();
        await controller.booking(realtyCalendarBookingData);
    } catch (error) {
        await log(`ERROR. /api/book error ${JSON.stringify(error)}`);
    } finally {
        res.sendStatus(200);
    }
});

apiRouter.get('/bookings', jsonParser, async (req, res) => {
    try {
        const controller = new BookingController();
        const bookings = await controller.getActiveBookings();

        res.send({ bookings });
    } catch (error) {
        await log([
            'ERROR',
            '/api/bookings',
            `error ${error.name}: ${error.message}`,
        ]);
        res.sendStatus(400);
    }
});

apiRouter.get('/booking/:id', jsonParser, async function (req, res) {
    const bookingId = parseInt(req.params.id, 10);

    if (!bookingId) {
        return res.sendStatus(404);
    }

    try {
        const controller = new BookingController();
        const booking = await controller.getBookingById(bookingId);

        res.json({ booking });
    } catch (error) {
        await log([
            'ERROR',
            `/api/booking/${bookingId}`,
            `error ${error.name}: ${error.message}`,
        ]);
        res.sendStatus(400);
    }
});

apiRouter.get('/apartments', jsonParser, async (req, res) => {
    try {
        const apartments = await ApartmentController.getApartments();

        res.json({ apartments });
    } catch (error) {
        await log([
            'ERROR',
            '/api/apartments',
            `error ${error.name}: ${error.message}`,
        ]);
        res.sendStatus(400);
    }
});

export { apiRouter };