import { Component } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
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
        { displayName: 'Neue Trainingseinheit', routerLink: 'workout/new' },
        { displayName: 'Neuer Status', routerLink: 'status/new' },
        { displayName: 'Wochenstatistik', routerLink: 'stat1' },
        { displayName: 'Jahresstatistik', routerLink: 'stat2' },
        { displayName: 'Export...', routerLink: 'export' },
        { displayName: 'Passwort ändern', routerLink: 'updatePassword' },
        { displayName: 'Über das Climbing Logbook', routerLink: 'about' },
    ];

    constructor(public authenticationService: AuthenticationService, private router: Router) {
    }

    public goToLoginPage() {
        this.router.navigate(['/login']);
    }
}
