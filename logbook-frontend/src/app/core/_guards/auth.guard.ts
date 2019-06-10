import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../_services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // check if the user is logged in
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && !this.isExpired(currentUser.exp)) {
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }

    private isExpired(dateStr: string) {
        const now = new Date();
        const date = new Date(Number(dateStr));
        const result = date < now;
        //console.log('isExpired: ' + result + ' ' + date + ' ' + now);

        return result;
    }
}
