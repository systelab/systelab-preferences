import { NgModule, Type, ModuleWithProviders } from '@angular/core';
import { MemoryStorageService } from './memory-storage.service';
import { SessionStorageService } from './session-storage.service';
import { LocalStorageService } from './local-storage.service';
import { PreferencesService } from './preferences.service';

@NgModule({})
export class SystelabPreferencesModule {
	public static forRoot(entryComponents?: Array<Type<any> | any[]>): ModuleWithProviders {
		return {
			ngModule:  SystelabPreferencesModule,
			providers: [
				{provide: MemoryStorageService, useClass: MemoryStorageService},
				{provide: SessionStorageService, useClass: SessionStorageService},
				{provide: LocalStorageService, useClass: LocalStorageService},
				{provide: PreferencesService, useClass: PreferencesService}
				]
		};
	}
}
