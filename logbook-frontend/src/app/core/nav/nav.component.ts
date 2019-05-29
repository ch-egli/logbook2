import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../../_services';
import { User } from '../../_models';

interface NavItem {
    displayName: string;
    routerLink: string;
}

@Component({
    selector: 'app-navbar',
    templateUrl: './nav.component.html'
})
export class NavComponent {
    currentUser: User;

    public navItems: Array<NavItem> = [
        { displayName: 'Home', routerLink: 'home' },
        { displayName: 'Theme', routerLink: 'theme' },
        { displayName: 'Statistik1', routerLink: 'stat1' },
        { displayName: 'Statistik2', routerLink: 'stat2' },
        { displayName: 'About', routerLink: 'about' },
        { displayName: 'Login', routerLink: 'login' },
    ];

    constructor(private authenticationService: AuthenticationService) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

}
