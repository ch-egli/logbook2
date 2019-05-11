import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {routing} from './app.routes';
import {CoreModule} from './core/core.module';
import {LogbookModule} from './logbook/logbook.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        CoreModule,
        LogbookModule,
        routing
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
