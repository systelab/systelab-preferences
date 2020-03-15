import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
	providedIn: 'root'
})
export class LocalStorageService extends StorageService {
	constructor() {
		super(localStorage);
	}
}
