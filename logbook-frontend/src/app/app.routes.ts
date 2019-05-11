import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AboutComponent} from './logbook/about/about.component';
import {HomeComponent} from './logbook/home/home.component';
import {ThemeComponent} from './logbook/theme/theme.component';

export const appRoutes: Routes = [
    {path: 'about', component: AboutComponent},
    {path: 'theme', component: ThemeComponent},
    {path: '**', component: HomeComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });
