import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './logbook/login/login.component';
import { PasswordComponent } from './logbook/login/password.component';
import { AboutComponent } from './logbook/about/about.component';
import { HomeComponent } from './logbook/home/home.component';
import { WorkoutComponent } from './logbook/workout/workout.component';
import { StatusComponent } from './logbook/status/status.component';
import { ChartsComponent } from './logbook/charts/charts.component';
import { Charts2Component } from './logbook/charts/charts2.component';
import { ExportComponent } from './logbook/export/export.component';
import { AuthGuard } from './core/_guards/auth.guard';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'workout/:wo', component: WorkoutComponent, canActivate: [AuthGuard] },
    { path: 'status/:st', component: StatusComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'updatePassword', component: PasswordComponent },
    { path: 'stat1', component: ChartsComponent, canActivate: [AuthGuard] },
    { path: 'stat2', component: Charts2Component, canActivate: [AuthGuard] },
    { path: 'export', component: ExportComponent, canActivate: [AuthGuard] },
    { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home' },
];

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes, { useHash: true, enableTracing: false });
