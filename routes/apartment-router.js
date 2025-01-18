import express from 'express';
import { ApartmentController } from "../controllers/apartment/apartment-controller.js";

const apartmentRouter = express.Router();

apartmentRouter.get('/', async function (req, response) {
    const apartments = await ApartmentController.getApartments();
    response.render('apartments.hbs', {
        apartments,
    });
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

export { apartmentRouter };
