import { DeleteBookingService } from '../model/service/delete-booking-service.js';
import { log } from '../model/logger/index.js';

export async function deleteBooking(bookingId) {
	try {
		const deleteBookingService = new DeleteBookingService();
		await deleteBookingService.deleteBooking({ id: bookingId });
	} catch (error) {
		await log(`ERROR. DeleteBooking. ${error.name}: ${error.message}`);
	}
}
