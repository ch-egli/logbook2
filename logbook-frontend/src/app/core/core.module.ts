import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { NavComponent } from './nav/nav.component';
import { HttpClientModule } from '@angular/common/http';

// AOT requires an exported function for factories
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule
    ],
    declarations: [NavComponent],
    exports: [NavComponent],
    providers: []
})
export class CoreModule {

    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'core module');
    }
}
