import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './logbook/login/login.component';
import { AboutComponent } from './logbook/about/about.component';
import { HomeComponent } from './logbook/home/home.component';
import { ThemeComponent } from './logbook/theme/theme.component';
import { ChartsComponent } from './logbook/charts/charts.component';
import { Charts2Component } from './logbook/charts/charts2.component';
import { AuthGuard } from './_guards/auth.guard';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'theme', component: ThemeComponent },
    { path: 'stat1', component: ChartsComponent, canActivate: [AuthGuard] },
    { path: 'stat2', component: Charts2Component, canActivate: [AuthGuard] },
    { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home' },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true, enableTracing: false });
