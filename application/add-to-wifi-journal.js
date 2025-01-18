import { log } from '../model/logger/index.js';
import { WifiJournalService } from '../services/wifi/wifi-journal-service.js';

/**
 * @param {WifiJournalEntry} wifiJournalEntry
 * @returns {Promise<void>}
 */
export async function addToWifiJournal(wifiJournalEntry) {
	try {
		await WifiJournalService.addWifiJournalEntry(wifiJournalEntry);
	} catch (error) {
		await log([
			'ERROR',
			'AddToWifiJournal',
			`${error.name}: ${error.message}`,
		]);
	}
}