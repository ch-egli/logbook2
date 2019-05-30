import { Component } from '@angular/core';
import { AuthenticationService } from '../../_services';
import { Router } from '@angular/router';

interface NavItem {
    displayName: string;
    routerLink: string;
}

@Component({
    selector: 'app-navbar',
    templateUrl: './nav.component.html'
})
export class NavComponent {
    currentUser = 'chrigu';

    public navItems: Array<NavItem> = [
        { displayName: 'Home', routerLink: 'home' },
        { displayName: 'Theme', routerLink: 'theme' },
        { displayName: 'Statistik1', routerLink: 'stat1' },
        { displayName: 'Statistik2', routerLink: 'stat2' },
        { displayName: 'About', routerLink: 'about' },
    ];

    constructor(private authenticationService: AuthenticationService, private router: Router) {
    }

    public goToLoginPage() {
        this.router.navigate(['/login']);
    }
}
