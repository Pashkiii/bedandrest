import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import * as path from 'node:path';
import express from 'express';
import hbs from 'hbs';
import expressHbs from 'express-handlebars';

import { apartmentRouter } from '../routes/apartment-router.js';
import { apiApartmentRouter} from '../routes/api-apartment-router.js';
import { bookingRouter } from '../routes/booking-router.js';
import { apiRouter } from '../routes/api-router.js';
import { wifiRouter } from '../routes/wifi-router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.engine('hbs', expressHbs.engine({
	layoutsDir: 'views/layouts',
	defaultLayout: 'layout',
	extname: 'hbs',
}));
app.set('views', __dirname + '/../views');
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

app.use('/apartments', apartmentRouter);
app.use('/bookings', bookingRouter);
app.use('/wifi', wifiRouter);
app.use('/api', apiRouter);
app.use('/api/apartment', apiApartmentRouter);

app.get('/', function (req, response) {
	response.redirect('/bookings');
});

app.listen(port, async () => {
	console.log('Start app in port:', port);
});
