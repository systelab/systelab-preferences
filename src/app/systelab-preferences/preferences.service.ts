import { Injectable } from '@angular/core';

declare var pako: any;
let compressor: any = pako;

@Injectable()
export class PreferencesService {

	private preferences = new Map<string, Object>();

	public clear() {
		this.preferences.clear();
	}

	public put(key: string, value: any): void {
		this.preferences.set(key, value);
	}

	public get(key: string): any {
		return this.preferences.get(key);
	}

	public remove(key: string): void {
		this.preferences.delete(key);
	}

	public removeStartsWith(startWith: string): void {
		this.preferences.forEach((value: Object, key: string) => {
			if (key.startsWith(startWith)) {
				this.remove(key);
			}
		});
	}

	public getInCompressFormat(): any {
		const passToServer: any = {};
		this.preferences.forEach((value: Object, key: string) => {
			passToServer[key] = value;
		});

		const binaryString = compressor.deflate(JSON.stringify(passToServer), {to: 'string'});
		return btoa(binaryString);
	}

	public putFromCompressFormat(compressed: any) {
		// Do your best
		try {
			const result = compressor.inflate(atob(compressed), {to: 'string'});
			const parsed = JSON.parse(result, (k, v) => {
				this.preferences.set(k, v);
				return v;
			});
		} catch (ex) {
		}
	}
}
