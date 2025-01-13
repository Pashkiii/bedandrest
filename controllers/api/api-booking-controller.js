import { RealtyCalendarAdapter } from '../../services/realty-calendar-adapter.js';
import { ParseDataError } from '../../model/exception.js';
import { log } from '../../model/logger/index.js';
import { realtyCalendarAction } from '../../model/const.js';
import { createBooking } from '../../application/create-booking.js';
import { updateBooking } from '../../application/update-booking.js';
import { deleteBooking } from '../../application/delete-booking.js';

export class ApiBookingController {
	async booking(realtyCalendarData) {
		try {
			const realtyCalendarAdapter = new RealtyCalendarAdapter(realtyCalendarData);
			const statusCd = realtyCalendarAdapter.extractStatusCd();
			if (statusCd !== 5) {
				return;
			}

			const action = realtyCalendarAdapter.extractAction();
			switch (action) {
				case (realtyCalendarAction.create):
					await createBooking(realtyCalendarAdapter.extractBooking());
					break;
				case realtyCalendarAction.update:
					await updateBooking(realtyCalendarAdapter.extractBooking());
					break;
				case realtyCalendarAction.delete:
					const bookingId = realtyCalendarAdapter.extractBookingId();
					await deleteBooking(bookingId);
					break;
				default:
					await log(`ERROR. ApiBookingController_booking. Action not found: ${action}`);
			}
		} catch (error) {
			if (error instanceof ParseDataError) {
				await log(`ERROR. ApiBookingController_booking. ParseDataError ${error.message}. Data: ${JSON.stringify(realtyCalendarData)}`);
			} else {
				await log(`ERROR. ApiBookingController_booking. UnhandledError message: ${error.message}. ${JSON.stringify(error)}`);
			}
		}
	}
}