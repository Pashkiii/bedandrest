import { DB } from "../model/db";
import { log } from "../logger";

export class DeleteBookingService {
    async deleteBooking(booking) {
        const bookingId = booking.id;

        try {
            await DB.deleteBook(bookingId);
        } catch (error) {
            await log(`Delete booking error. Booking: ${bookingId}. DeleteBookingService.deleteBooking`);
        }
    }
}
