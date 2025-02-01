import { Router, json } from 'express';
import { body } from 'express-validator';
import { log } from '../model/logger/index.js';
import { ApartmentController } from '../controllers/apartment/apartment-controller.js';

const jsonParser = json();
const apiApartmentRouter = Router();

apiApartmentRouter.post(
	'/create',
	jsonParser,
	body('id').notEmpty().isInt(),
	body('address').notEmpty().escape(),
	body('ads').isURL({ protocols: ['https'] }),
	body('inHour').notEmpty().isInt(),
	body('outHour').notEmpty().isInt(),
	body('deposit').notEmpty().isNumeric(),
	body('linens').notEmpty().isInt(),
	body('thingsLink').notEmpty().isURL({ protocols: ['https'] }),
	async (req, res) => {
		try {
			await ApartmentController.addApartment(req, res);
		} catch (error) {
			await log([
				'ERROR',
				'/api/apartment/addApartment',
				`error ${error.name}: ${error.message}`,
			]);
			res.sendStatus(400);
		}
	});

export { apiApartmentRouter };