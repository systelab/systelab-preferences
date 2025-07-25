import { Injectable } from '@angular/core';

declare var pako: any;
const compressor: any = pako;

@Injectable({
	providedIn: 'root'
})
export class MemoryStorageService {

	private preferences = new Map<string, Object>();

	public clear(): void {
		this.preferences.clear();
	}

	public put(key: string, value: any): void {
		this.preferences.set(key, value);
	}

	public get(key: string, defaultValue?: any): any {
		const value = this.preferences.get(key);
		if (value === undefined || value === null) {
			if (defaultValue === undefined || defaultValue === null) {
				return value;
			} else {
				return defaultValue;
			}
		} else {
			return value;
		}
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

	public removeEndsWith(endsWith: string): void {
		this.preferences.forEach((value: Object, key: string) => {
			if (key.endsWith(endsWith)) {
				this.remove(key);
			}
		});
	}

	public getInCompressFormat(): string {
		const compressed = compressor.deflate(this.getInStringFormat()); // Uint8Array
		const binaryString = String.fromCharCode(...compressed);
		return btoa(binaryString);
	}

	public getInStringFormat(): string {
		const passToServer: any = {};
		this.preferences.forEach((value, key) => passToServer[key] = value);
		return JSON.stringify(passToServer);
	}

	public putFromCompressFormat(compressed: any) {
		this.clear();
		// Do your best
		try {
			const binaryString = atob(compressed);
			const byteArray = Uint8Array.from(binaryString, c => c.charCodeAt(0));
			const result = compressor.inflate(byteArray, { to: 'string' });
			const parsed = JSON.parse(result);
			Object.keys(parsed).forEach(key => this.preferences.set(key, parsed[key]));
		} catch (ex) {
		}
	}
}
