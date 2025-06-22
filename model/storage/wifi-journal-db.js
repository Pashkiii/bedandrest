import { WifiJournalModel } from '../model/wifi-journal.js' 

export class WifiJournalDb{
	async addWifiJournalEntry(wifiJournalEntryDto) {
		try {
			await WifiJournalModel.create(wifiJournalEntryDto);

			return { error: null };
		} catch (error) {
			return { error };
		}
	}
}
