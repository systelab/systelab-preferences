import { Injectable } from '@angular/core';
import { WebStorageService } from '@ng2plus/web-storage';

const webSessionStorageConfig = {
	prefix:   'Modulab',
	provider: 'sessionStorage'
};

@Injectable()
export class SessionService {
	constructor(private webStorageService: WebStorageService) {
		this.webStorageService.setup(webSessionStorageConfig);
		this.convertPreferencesToAngular2();
	}

	public putPreference(key: string, value: any): void {
		this.webStorageService
			.setup(webSessionStorageConfig)
			.set(key, value);
	}

	public getPreference(key: string): any {
		return this.webStorageService
			.setup(webSessionStorageConfig)
			.get(key);
	}

	public removePreference(key: string): void {
		this.webStorageService
			.setup(webSessionStorageConfig)
			.remove(key);
	}

	public removePreferenceStartsWith(startWith: string): void {
		const keys: string[] = this.webStorageService.keys();

		keys.forEach(function(currentKey: string) {
			if (currentKey.indexOf(startWith) > -1 && typeof this.webStorageService.get(currentKey) !== 'function') {
				this.removePreference(currentKey);
			}
		}, this);
	}

	// TODO: Review this conversion
	private convertPreferencesToAngular2() {
		Object.keys(sessionStorage)
			.forEach(preference => {
				if (preference.indexOf('Modulab.') > -1) {
					const preferenceName = preference.substring('Modulab.'.length);
					this.putPreference(preferenceName, JSON.parse(localStorage.getItem(preference)));
				}
			});
	}

}
