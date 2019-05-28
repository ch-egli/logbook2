import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { routing } from './app.routes';
import { CoreModule } from './core/core.module';
import { LogbookModule } from './logbook/logbook.module';
import { ServiceWorkerModule } from '@angular/service-worker';

import { HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './logbook/login/auth.interceptor';

import { environment } from '../environments/environment';

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
    providers: [AuthInterceptor],
    bootstrap: [AppComponent]
})
export class AppModule {
}
