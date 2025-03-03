import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import * as path from 'node:path';
import express from 'express';
import ViteExpress from 'vite-express';
import hbs from 'hbs';
import expressHbs from 'express-handlebars';

import { apartmentRouter } from '../routes/apartment-router.js';
import { apiApartmentRouter } from '../routes/api-apartment-router.js';
import { bookingRouter } from '../routes/booking-router.js';
import { apiRouter } from '../server/routes/api-router.js';
import { aptRouter } from '../routes/apt-router.js';
import { wifiRouter } from '../routes/wifi-router.js';
import { appRouter } from '../server/routes/app-router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;
const publicPath = path.join(path.resolve(), "public");
const distPath = path.join(path.resolve(), "dist");

app.use(express.static('public'));

app.engine('hbs', expressHbs.engine({
	layoutsDir: 'views/layouts',
	defaultLayout: 'layout',
	extname: 'hbs',
}));
app.set('views', __dirname + '/../views');
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

// app.use('/apartments', apartmentRouter);
// app.use('/bookings', bookingRouter);
app.use('/apt', aptRouter);
app.use('/wifi', wifiRouter);
app.use('/api', apiRouter);
app.use('/api/apartment', apiApartmentRouter);

if (process.env.NODE_ENV === "production") {
	app.use("/", express.static(distPath));
} else {
	app.use("/", express.static(publicPath));
}

app.use(appRouter);
app.use(router);

const server = app.listen(port, async () => {
	console.log('Start app in port:', port);
});

ViteExpress.bind(app, server);
