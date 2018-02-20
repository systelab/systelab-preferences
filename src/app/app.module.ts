import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { SystelabPreferencesModule } from './systelab-preferences/systelab-preferences.module';
import { MemoryStorageService } from './systelab-preferences/memory-storage.service';
import { LocalStorageService } from './systelab-preferences/local-storage.service';
import { SessionStorageService } from './systelab-preferences/session-storage.service';
import { PreferencesService } from './systelab-preferences/preferences.service';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports:      [
		BrowserModule,
		FormsModule,
		SystelabPreferencesModule.forRoot()
	],
	providers:    [MemoryStorageService,
		LocalStorageService,
		SessionStorageService,
		PreferencesService],
	bootstrap:    [AppComponent]
})
export class AppModule {
}

export { AppComponent } from './app.component';
