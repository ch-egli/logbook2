import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';
import localeCh from '@angular/common/locales/de-CH';

import { AppComponent } from './app.component';
import { routing } from './app.routes';
import { CoreModule } from './core/core.module';
import { LogbookModule } from './logbook/logbook.module';
import { ServiceWorkerModule } from '@angular/service-worker';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { JwtInterceptor } from './core/_helpers/jwt.interceptor'

import { environment } from '../environments/environment';

registerLocaleData(localeCh, 'de');

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        CoreModule,
        LogbookModule,
        routing,
        HttpClientModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: LOCALE_ID, useValue: 'de_CH' },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
