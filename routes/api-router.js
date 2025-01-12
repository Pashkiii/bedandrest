import { Router, json } from 'express';
import { ApiBookingController } from '../controllers/api/api-booking-controller.js';
import { log } from '../model/logger/index.js';

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

export { apiRouter };
