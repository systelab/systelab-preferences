import { NgModule, Type, ModuleWithProviders } from '@angular/core';
import { PreferencesService } from './preferences.service';
import { SessionStorageService } from './session-storage.service';
import { WebStorageService, WebStorageConfig } from '@ng2plus/web-storage';
import { LocalStorageService } from './local-storage.service';

export function getWebStorageService(): WebStorageService {
	const wsc: WebStorageConfig = {
		prefix: 'Systelab'
	};
	const wss: WebStorageService = new WebStorageService(wsc);
	return wss;
}

@NgModule({})
export class SystelabPreferencesModule {
	public static forRoot(entryComponents?: Array<Type<any> | any[]>): ModuleWithProviders {
		return {
			ngModule:  SystelabPreferencesModule,
			providers: [
				{provide: PreferencesService, useClass: PreferencesService},
				{provide: SessionStorageService, useClass: SessionStorageService},
				{provide: LocalStorageService, useClass: LocalStorageService},
				{provide: WebStorageService, useFactory: getWebStorageService}
				]
		};
	}
}
