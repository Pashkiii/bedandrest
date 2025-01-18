import { convertDateTimeToUtcTimezone } from '../../model/lib.js';
import { WifiJournalDb } from '../../model/storage/wifi-journal-db.js';
import { log } from '../../model/logger/index.js';

/**
 * @param {WifiJournalEntry} wifiJournalEntry
 */
function createWifiJournalEntryDto(wifiJournalEntry) {
	return {
		'apartment_id': wifiJournalEntry.apartmentId,
		'booking_id': wifiJournalEntry.bookingId,
		'create_date': convertDateTimeToUtcTimezone(wifiJournalEntry.createDate),
		'data': wifiJournalEntry.data,
	};
}

export class WifiJournalService {
	static async addWifiJournalEntry(wifiJournalEntry) {
		const wifiJournalEntryDto = createWifiJournalEntryDto(wifiJournalEntry);
		const wifiJournalDb = new WifiJournalDb();
		const { error } = wifiJournalDb.addWifiJournalEntry(wifiJournalEntryDto);

		if (error) {
			await log([
				'ERROR',
				'WifiJournalService',
				'addWifiJournalEntry',
				`Error: ${error.name}: ${error.message}}`,
			]);
		}
	}
}