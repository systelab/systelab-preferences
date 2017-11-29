import { Injectable } from '@angular/core';
import { WebStorageService } from '@ng2plus/web-storage';
import { StorageService } from './storage.service';

@Injectable()
export class LocalStorageService extends StorageService {

	constructor(private service: WebStorageService) {
		super(service);
	}

	public getWebStorageConfig() {
		return {
			prefix:   this.prefix;
			provider: 'localStorage'
		};
	}

}
