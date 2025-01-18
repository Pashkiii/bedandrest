import { Supabase } from './base.js';

export class WifiJournalDb extends Supabase {
	constructor() {
		super();
		this.table = 'wifi_journal';
	}

	async addWifiJournalEntry(wifiJournalEntryDto) {
		const { error } = await this.client
			.from(this.table)
			.insert(wifiJournalEntryDto);

		return { error };
	}
}