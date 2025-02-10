import express from 'express';
import { AptController } from '../controllers/apt/apt-controller.js';

const aptRouter = express.Router();

aptRouter.get('/:id', async function (request, response) {
	await AptController.getApt(request, response);
});

export { aptRouter };
