import { Injectable } from '@angular/core';
import { MemoryStorageService } from './memory-storage.service';
import { SessionStorageService } from './session-storage.service';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class PreferencesService {

	public static IN_MEMORY_STORAGE = 1;
	public static LOCAL_STORAGE = 2;
	public static SESSION_STORAGE = 3;

	private storage = PreferencesService.IN_MEMORY_STORAGE;

	public constructor( public memoryService: MemoryStorageService, public localService: LocalStorageService, public sessionService: SessionStorageService ) {
	}

	public setStorage( storage: number ) {
		if ( storage === PreferencesService.IN_MEMORY_STORAGE || storage === PreferencesService.LOCAL_STORAGE || storage === PreferencesService.SESSION_STORAGE ) {
			this.storage = storage;
		} else {
			console.error( 'Invalid storage type' );
		}
	}

	public getStorage(): number {
		return this.storage;
	}

	public usePrefix( prefix: string ) {
		if ( this.storage === PreferencesService.LOCAL_STORAGE ) {
			this.localService.usePrefix( prefix );
		} else if ( this.storage === PreferencesService.SESSION_STORAGE ) {
			this.sessionService.usePrefix( prefix );
		} else {
			console.error( 'You can not set a prefix for In-memory preferences' );
		}
	}

	public clear() {
		if ( this.storage === PreferencesService.IN_MEMORY_STORAGE ) {
			this.memoryService.clear();
		} else if ( this.storage === PreferencesService.LOCAL_STORAGE ) {
			this.localService.clear();
		} else {
			this.sessionService.clear();
		}
	}

	public put( key: string, value: any ): void {
		if ( this.storage === PreferencesService.IN_MEMORY_STORAGE ) {
			this.memoryService.put( key, value );
		} else if ( this.storage === PreferencesService.LOCAL_STORAGE ) {
			this.localService.put( key, value );
		} else {
			this.sessionService.put( key, value );
		}
	}

	public get( key: string ): any {
		if ( this.storage === PreferencesService.IN_MEMORY_STORAGE ) {
			return this.memoryService.get( key );
		} else if ( this.storage === PreferencesService.LOCAL_STORAGE ) {
			return this.localService.get( key );
		} else {
			return this.sessionService.get( key );
		}
	}

	public remove( key: string ): void {
		if ( this.storage === PreferencesService.IN_MEMORY_STORAGE ) {
			this.memoryService.remove( key );
		} else if ( this.storage === PreferencesService.LOCAL_STORAGE ) {
			this.localService.remove( key );
		} else {
			this.sessionService.remove( key );
		}
	}

	public removeStartsWith( startWith: string ): void {
		if ( this.storage === PreferencesService.IN_MEMORY_STORAGE ) {
			this.memoryService.removeStartsWith( startWith );
		} else if ( this.storage === PreferencesService.LOCAL_STORAGE ) {
			this.localService.removeStartsWith( startWith );
		} else {
			this.sessionService.removeStartsWith( startWith );
		}
	}

	public removeEndsWith( endsWith: string ): void {
		if ( this.storage === PreferencesService.IN_MEMORY_STORAGE ) {
			this.memoryService.removeEndsWith( endsWith );
		} else if ( this.storage === PreferencesService.LOCAL_STORAGE ) {
			this.localService.removeEndsWith( endsWith );
		} else {
			this.sessionService.removeEndsWith( endsWith );
		}
	}

	public getInStringFormat(): any {
		if ( this.storage === PreferencesService.IN_MEMORY_STORAGE ) {
			return this.memoryService.getInStringFormat();
		} else {
			return '';
		}
	}

	public getInCompressFormat(): any {
		if ( this.storage === PreferencesService.IN_MEMORY_STORAGE ) {
			return this.memoryService.getInCompressFormat();
		} else {
			return '';
		}
	}

	public putFromCompressFormat( compressed: any ) {
		if ( this.storage === PreferencesService.IN_MEMORY_STORAGE ) {
			this.memoryService.putFromCompressFormat( compressed );
		}
	}
}
