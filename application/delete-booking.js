import { BookingActionService } from '../services/bookings/booking-action-service.js';
import { log } from '../model/logger/index.js';

/**
 * @param {number} bookingId
 * @return {Promise<void>}
 */
export async function deleteBooking(bookingId) {
	try {
		await BookingActionService.deleteBooking(bookingId);
	} catch (error) {
		await log(
			`ERROR. DeleteBooking. ${error.name}: ${error.message}`,
			{},
			'ERROR',
		);
	}
}
