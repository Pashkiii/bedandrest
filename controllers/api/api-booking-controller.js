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
			if (![realtyCalendarAction.create, realtyCalendarAction.update, realtyCalendarAction.delete].includes(action))
			{
				return;
			}

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
					await log(`ApiBookingController_booking. Action not found: ${action}`, { type: 'ERROR' });
			}
		} catch (error) {
			if (error instanceof ParseDataError) {
				await log(`ApiBookingController_booking. ParseDataError ${error.message}. Data: ${JSON.stringify(realtyCalendarData)}`, {
					type: 'ERROR'
				});
			} else {
				await log(`ApiBookingController_booking. UnhandledError message: ${error.message}. ${JSON.stringify(error)}`, {
					type: 'ERROR'
				});
			}
		}
	}
}