import express from 'express';
import { BookingController } from '../controllers/booking/booking-controller.js';

const bookingRouter = express.Router();

bookingRouter.get('/', async function (req, res) {
    const controller = new BookingController();
    const bookings = await controller.getActiveBookings();

    res.render('bookings.hbs', {
        bookings: bookings || []
    });
});

bookingRouter.get('/:id', async function (req, res) {
    const bookingId = parseInt(req.params.id, 10);

    if (!bookingId) {
        return res.sendStatus(404);
    }

    const controller = new BookingController();
    const booking = await controller.getBookingById(bookingId);

    res.render('booking.hbs', {
        booking
    });
});

export { bookingRouter }
