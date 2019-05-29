import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // check if the user is logged in
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            console.log('canActivate: currentUser: ' + currentUser);
            return true;
        }

        // not logged in so redirect to login page with the return url
        console.log('canActivate: not logged in... navigate to login...');
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}