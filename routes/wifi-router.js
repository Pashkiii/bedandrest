import express from 'express';
import { WifiController } from '../controllers/wifi/wifi-controller.js';

const wifiRouter = express.Router();

wifiRouter.get('/:id', async function (req, res) {
	const wifiController = new WifiController();
	await wifiController.getApartmentWiFi(req, res);
});

export { wifiRouter };
