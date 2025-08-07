import express from 'express';
import { body } from 'express-validator';
import { ApartmentController } from '../controllers/apartment/apartment-controller.js';

const urlencodedParser = express.urlencoded({ extended: false });
const apartmentRouter = express.Router();

apartmentRouter.get('/', async function (req, response) {
	const apartments = await ApartmentController.getApartments();
	response.render('apartments.hbs', {
		apartments,
	});
});

apartmentRouter.get('/new', async function (req, response) {
	return response.render('apartment-create.hbs', {});
});

apartmentRouter.get('/:id', async function (req, response) {
	const apartmentId = parseInt(req.params.id, 10);

	if (!apartmentId) {
		return response.sendStatus(404);
	}

	const apartment = await ApartmentController.getApartment(apartmentId);
	if (!apartment) {
		return response.sendStatus(404);
	}

	return response.render('apartment.hbs', {
		apartment,
	});
});


apartmentRouter.post(
	'/:id',
	urlencodedParser,
	body('address').notEmpty(),
	body('ads'),
	body('inHour').notEmpty().isTime({ mode: 'default', hourFormat: 'hour24' }),
	body('outHour').notEmpty().isTime({ mode: 'default', hourFormat: 'hour24' }),
	body('deposit').isNumeric(),
	body('linens').notEmpty().isInt(),
	body('thingsLink').isURL({ protocols: ['https'] }),
	body('mapPoint').isURL({ protocols: ['https'] }),
	async function (request, response) {
		await ApartmentController.updateApartment(request, response);
	}
);



export { apartmentRouter };
