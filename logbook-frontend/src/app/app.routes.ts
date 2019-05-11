import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AboutComponent} from './logbook/about/about.component';
import {HomeComponent} from './logbook/home/home.component';
import {ThemeComponent} from './logbook/theme/theme.component';
import {ChartsComponent} from './logbook/charts/charts.component';

export const appRoutes: Routes = [
    {path: 'theme', component: ThemeComponent},
    {path: 'charts', component: ChartsComponent},
    {path: 'about', component: AboutComponent},
    {path: '**', component: HomeComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });
