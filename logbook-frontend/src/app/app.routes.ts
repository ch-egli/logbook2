import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './logbook/login/login.component';
import { AboutComponent } from './logbook/about/about.component';
import { HomeComponent } from './logbook/home/home.component';
import { ThemeComponent } from './logbook/theme/theme.component';
import { ChartsComponent } from './logbook/charts/charts.component';
import { Charts2Component } from './logbook/charts/charts2.component';

export const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'theme', component: ThemeComponent },
    { path: 'stat1', component: ChartsComponent },
    { path: 'stat2', component: Charts2Component },
    { path: 'about', component: AboutComponent },
    { path: '**', component: HomeComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });
