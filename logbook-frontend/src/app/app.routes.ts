/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2016.
 *
 * Routendefinition
 *
 * @author u220374 (Reto Lehmann)
 * @version: 2.0.0
 * @since 14.07.2016, 2016.
 */
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AboutComponent} from './example/about/about.component';
import {HomeComponent} from './example/home/home.component';
import {ThemeComponent} from './example/theme/theme.component';

export const appRoutes: Routes = [
    {path: 'about', component: AboutComponent},
    {path: 'theme', component: ThemeComponent},
    {path: '**', component: HomeComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });
