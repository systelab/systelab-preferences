import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { SystelabPreferencesModule } from './systelab-preferences/systelab-preferences.module';
import { PreferencesService } from './systelab-preferences/preferences.service';
import { LocalStorageService } from './systelab-preferences/local-storage.service';
import { SessionStorageService } from './systelab-preferences/session-storage.service';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports:      [
		BrowserModule,
		FormsModule,
		SystelabPreferencesModule.forRoot()
	],
	providers:    [PreferencesService,
		LocalStorageService,
		SessionStorageService],
	bootstrap:    [AppComponent]
})
export class AppModule {
}

export { AppComponent } from './app.component';
