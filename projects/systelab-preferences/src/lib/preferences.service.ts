import { Injectable } from '@angular/core';
import { MemoryStorageService } from './memory-storage.service';
import { SessionStorageService } from './session-storage.service';
import { LocalStorageService } from './local-storage.service';

export enum StorageType {
	IN_MEMORY_STORAGE = 1,
	LOCAL_STORAGE = 2,
	SESSION_STORAGE = 3
}
@Injectable({
	providedIn: 'root'
})
export class PreferencesService {

	private storage = StorageType.IN_MEMORY_STORAGE;

	public constructor(public memoryService: MemoryStorageService, public localService: LocalStorageService, public sessionService: SessionStorageService) {
	}

	public setStorage(storage: StorageType): void {
			this.storage = storage;
	}

	public getStorage(): number {
		return this.storage;
	}

	public usePrefix(prefix: string): void {
		if (this.storage === StorageType.LOCAL_STORAGE) {
			this.localService.usePrefix(prefix);
		} else if (this.storage === StorageType.SESSION_STORAGE) {
			this.sessionService.usePrefix(prefix);
		} else {
			console.error('You can not set a prefix for In-memory preferences');
		}
	}

	public getPrefix(): string {
		if (this.storage === StorageType.LOCAL_STORAGE) {
			return this.localService.getPrefix();
		} else if (this.storage === StorageType.SESSION_STORAGE) {
			return this.sessionService.getPrefix();
		} else {
			return undefined;
		}
	}

	public clear(): void {
		if (this.storage === StorageType.IN_MEMORY_STORAGE) {
			this.memoryService.clear();
		} else if (this.storage === StorageType.LOCAL_STORAGE) {
			this.localService.clear();
		} else {
			this.sessionService.clear();
		}
	}

	public put(key: string, value: any): void {
		if (this.storage === StorageType.IN_MEMORY_STORAGE) {
			this.memoryService.put(key, value);
		} else if (this.storage === StorageType.LOCAL_STORAGE) {
			this.localService.put(key, value);
		} else {
			this.sessionService.put(key, value);
		}
	}

	public get(key: string, defaultValue?: any): any {
		if (this.storage === StorageType.IN_MEMORY_STORAGE) {
			return this.memoryService.get(key, defaultValue);
		} else if (this.storage === StorageType.LOCAL_STORAGE) {
			return this.localService.get(key, defaultValue);
		} else {
			return this.sessionService.get(key, defaultValue);
		}
	}

	public remove(key: string): void {
		if (this.storage === StorageType.IN_MEMORY_STORAGE) {
			this.memoryService.remove(key);
		} else if (this.storage === StorageType.LOCAL_STORAGE) {
			this.localService.remove(key);
		} else {
			this.sessionService.remove(key);
		}
	}

	public removeStartsWith(startWith: string): void {
		if (this.storage === StorageType.IN_MEMORY_STORAGE) {
			this.memoryService.removeStartsWith(startWith);
		} else if (this.storage === StorageType.LOCAL_STORAGE) {
			this.localService.removeStartsWith(startWith);
		} else {
			this.sessionService.removeStartsWith(startWith);
		}
	}

	public removeEndsWith(endsWith: string): void {
		if (this.storage === StorageType.IN_MEMORY_STORAGE) {
			this.memoryService.removeEndsWith(endsWith);
		} else if (this.storage === StorageType.LOCAL_STORAGE) {
			this.localService.removeEndsWith(endsWith);
		} else {
			this.sessionService.removeEndsWith(endsWith);
		}
	}

	public getInStringFormat(): string {
		if (this.storage === StorageType.IN_MEMORY_STORAGE) {
			return this.memoryService.getInStringFormat();
		} else {
			return '';
		}
	}

	public getInCompressFormat(): any {
		if (this.storage === StorageType.IN_MEMORY_STORAGE) {
			return this.memoryService.getInCompressFormat();
		} else {
			return '';
		}
	}

	public putFromCompressFormat(compressed: any): void {
		if (this.storage === StorageType.IN_MEMORY_STORAGE) {
			this.memoryService.putFromCompressFormat(compressed);
		}
	}
}
