import {CommonModule} from '@angular/common';
import {NgModule, Optional, SkipSelf} from '@angular/core';
import {RouterModule} from '@angular/router';

import {throwIfAlreadyLoaded} from './module-import-guard';
import {NavComponent} from './nav/nav.component';
import {AUTH_INTERCEPTOR, AuthModule} from 'esta-webjs-extensions';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {environment} from '../../environments/environment';

// AOT requires an exported function for factories
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        AuthModule.forRoot(environment.authConfig, environment.authOptions),
        HttpClientModule
    ],
    declarations: [NavComponent],
    exports: [NavComponent],
    providers: [AUTH_INTERCEPTOR]
})
export class CoreModule {

    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'core module');
    }
}
