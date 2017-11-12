import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { WebStorageService } from '@ng2plus/web-storage';

const webLocalStorageConfig = {
	prefix:   'Modulab',
	provider: 'localStorage'
};

declare var pako: any;
let compressor: any = pako;

@Injectable()
export class PreferencesService {
	private excluseMachinePreferences: string[] = ['localsamplecollectioncenterid'];

	constructor(private webStorageService: WebStorageService,
				private sessionService: SessionService) {
		this.webStorageService.setup(webLocalStorageConfig);
		this.convertPreferencesToAngular2();
	}

	public putPreference(key: string, value: any): void {
		let inMemoryPreferences: any;
		if (this.sessionService.getPreference('isPreferencesInMemory') || false) {
			inMemoryPreferences = this.sessionService.getPreference('inMemoryPreferences');
			if (inMemoryPreferences !== null) {
				this.sessionService.putPreference(key, value);
			}
		}
		this.webStorageService
			.setup(webLocalStorageConfig)
			.set(key, value);
	}

	public getPreference(key: string): any {
		let inMemoryPreferences;
		if (this.sessionService.getPreference('isPreferencesInMemory') || false) {
			inMemoryPreferences = this.sessionService.getPreference('inMemoryPreferences');
			if (inMemoryPreferences !== null) {
				const result = inMemoryPreferences[key];
				if (result !== null && result !== undefined) {
					return result;
				}
			}
		}
		return this.webStorageService
			.setup(webLocalStorageConfig)
			.get(key);
	}

	public removePreference(key: string): void {
		let inMemoryPreferences;
		if (this.sessionService.getPreference('isPreferencesInMemory') || false) {
			inMemoryPreferences = this.sessionService.getPreference('inMemoryPreferences');
			if (inMemoryPreferences !== null) {
				this.sessionService.removePreference(key);
			}
		}
		this.webStorageService
			.setup(webLocalStorageConfig)
			.remove(key);
	}

	public removePreferenceStartWith(startWith: string): void {
		const keys: string[] = this.webStorageService.keys();

		keys.forEach(function(currentKey: string) {
			if (currentKey.indexOf(startWith) > -1 && typeof this.webStorageService.get(currentKey) !== 'function') {
				this.removePreference(currentKey);
			}
		}, this);
	}

	public getPreferencesFromMemory(): any {
		let inMemoryPreferences: any,
			binaryString: any,
			passToServer: any = {};

		if (this.sessionService.getPreference('isPreferencesInMemory') || false) {
			inMemoryPreferences = this.sessionService.getPreference('inMemoryPreferences');
			if (inMemoryPreferences !== null) {
				for (let key in inMemoryPreferences) {
					if (this.preferenceMustBeLoadedInMemory(key)) {
						passToServer[key] = inMemoryPreferences[key];
					}
				}
				binaryString = compressor.deflate(JSON.stringify(passToServer), {to: 'string'});
				return btoa(binaryString);
			}
		}
		return null;
	}

	public setupPreferences(loginData: any): void {
		let preferencesData: Object = {},
			isPreferencesInMemory;

		isPreferencesInMemory = loginData.preferencesInDB || false;
		this.sessionService.putPreference('inMemoryPreferences', preferencesData);
		this.sessionService.putPreference('isPreferencesInMemory', isPreferencesInMemory);

		if (isPreferencesInMemory) {
			try {
				const result = compressor.inflate(atob(loginData.preferences), {to: 'string'});
				const parsed = JSON.parse(result);
				this.sessionService.putPreference('inMemoryPreferences', parsed);
			} catch (ex) {
				this.loadPreferencesInMemory();
			}
		}
	}

	private loadPreferencesInMemory() {
		const inMemoryPreferences = this.sessionService.getPreference('inMemoryPreferences');
		if (inMemoryPreferences !== null) {
			for (let key in this.webStorageService.keys()) {
				if (this.preferenceMustBeLoadedInMemory(key)) {
					inMemoryPreferences[key] = this.webStorageService.get(key);
				}
			}
		}
	}

	private preferenceMustBeLoadedInMemory(key: any): boolean {
		const notInMemory = this.excluseMachinePreferences.filter(function(obj: any) {
			return obj === key;
		});
		return notInMemory.length === 0 ? true : false;
	}

	// TODO: Review this conversion
	private convertPreferencesToAngular2() {
		Object.keys(localStorage)
			.forEach(preference => {
				if (preference.indexOf('Modulab.') > -1) {
					const preferenceName = preference.substring('Modulab.'.length);
					this.putPreference(preferenceName, JSON.parse(localStorage.getItem(preference)));
				}
			});
	}

}
