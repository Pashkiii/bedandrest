import fetch from 'node-fetch';
import { log } from '../logger/index.js';

export class OkiDokiApi {
    static makeUri(path) {
        return 'https://api.doki.online/external/' + path;
    }

    static async contract(data) {
        const url = OkiDokiApi.makeUri('contract');

        await log(`OkiDoki data: ${JSON.stringify(data)}`);

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: OkiDokiApi.#headers(),
                body: JSON.stringify(data)
            });
            const result = await response.json();
            
            if (response.ok) {
                return [null, result];
            }

            return [response.status];
        } catch (error) {
            await log(`Call OkiDoki API: ${url} error`, error);
            return [error];
        }
    }

    static #headers() {
        const headers = {};

        headers['Content-Type'] = 'application/json';

        return headers;
    }
}
