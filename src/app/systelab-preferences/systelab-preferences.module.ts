import { NgModule, Type, ModuleWithProviders } from '@angular/core';
import { PreferencesService } from './preferences.service';
import { SessionService } from './session.service';
import { WebStorageService, WebStorageConfig } from '@ng2plus/web-storage';

const webStorageConfig = {
	prefix: 'Modulab'
};

export function getWebStorageService(): WebStorageService {

	const wsc: WebStorageConfig = {
		prefix: 'Modulab'
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
				{provide: SessionService, useClass: SessionService},
				{provide: WebStorageService, useFactory: getWebStorageService},
				// {provide: WEB_STORAGE_SERVICE_CONFIG, useFactory: getWebStorageConfig}
			]
		};
	}
}
