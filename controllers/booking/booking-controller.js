import { BookingGetService as BookingService, BookingGetService } from '../../services/bookings/booking-get-service.js';
import { syncDateToMoscow } from '../../model/lib.js';
import {
	createBookingViewModel,
	createBookingPageViewModel
} from '../../model/booking/booking.js';
import { ApartmentService } from '../../services/apartment/apartment-service.js';

export class BookingController {
	async getActiveBookings(){
		const today = syncDateToMoscow();
		const bookingModels = await BookingGetService.getActiveBookings(today);

		return (bookingModels || []).map((bookingModel) => createBookingViewModel(bookingModel));
	}

	async getBookingById(bookingId) {
		const bookingModel = await BookingService.getBookingById(bookingId);
		if (!bookingModel) {
			return null;
		}

		const apartmentModel = await ApartmentService.getApartmentById(bookingModel.apartmentId);

		return createBookingPageViewModel(bookingModel, apartmentModel);
	}
}