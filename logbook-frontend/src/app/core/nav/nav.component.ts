/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2017.
 *
 * ESTA WebJS: Navbar Component
 *
 * @author u218609 (Kevin Kreuzer)
 * @version: 2.0.0
 * @since 28.04.2017, 2017.
 */
import {Component} from '@angular/core';
import {AuthService} from 'esta-webjs-extensions';
import {Observable} from 'rxjs';
import {KeycloakProfile} from 'keycloak-js';

interface NavItem {
    displayName: string;
    routerLink: string;
}

@Component({
    selector: 'app-navbar',
    templateUrl: './nav.component.html'
})
export class NavComponent {

    public navItems: Array<NavItem> = [
        {displayName: 'Home', routerLink: 'home'},
        {displayName: 'About', routerLink: 'about'},
        {displayName: 'Theme', routerLink: 'theme'}
    ];

    public userInfo: Observable<KeycloakProfile>;

    public isCollapsed = true;

    constructor(public authService: AuthService) {
        this.userInfo = this.authService.getUserInfo();
    }

}
