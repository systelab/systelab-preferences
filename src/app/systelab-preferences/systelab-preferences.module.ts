import { NgModule, Type, ModuleWithProviders } from '@angular/core';
import { PreferencesService } from './preferences.service';
import { SessionStorageService } from './session-storage.service';
import { LocalStorageService } from './local-storage.service';

@NgModule({})
export class SystelabPreferencesModule {
	public static forRoot(entryComponents?: Array<Type<any> | any[]>): ModuleWithProviders {
		return {
			ngModule:  SystelabPreferencesModule,
			providers: [
				{provide: PreferencesService, useClass: PreferencesService},
				{provide: SessionStorageService, useClass: SessionStorageService},
				{provide: LocalStorageService, useClass: LocalStorageService}
				]
		};
	}
}
