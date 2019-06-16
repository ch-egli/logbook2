import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    baseUrl: string;

    constructor(private http: HttpClient) {
        this.baseUrl = environment.baseUrl;
    }

    public login(username: string, password: string) {
        return this.http.post<any>(this.baseUrl + 'auth/token', { username, password })
            .pipe(map(user => {
                console.log('user: ' + user);
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    let now = new Date();
                    now.setSeconds(now.getSeconds() + 3595); // one hour minus 5 seconds
                    user.exp = now.getTime();
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            }));
    }

    public getCurrentUser() {
        return localStorage.getItem('currentUser');
    }

    public isLoggedIn() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && !this.isExpired(currentUser.exp)) {
            // console.log('AuthenticationService: isLoggedIn: true');
            return true;
        } else {
            // console.log('AuthenticationService: isLoggedIn: false');
            return false;
        }
    }

    public getUsername() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        return currentUser.username;
    }

    public isAdmin() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.roles) {
            return currentUser.roles.indexOf('admin') > -1;
        }
    }

    public isTrainer() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.roles) {
            return currentUser.roles.indexOf('trainer') > -1;
        }
    }

    public isEgliSister() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.roles) {
            return currentUser.roles.indexOf('egliSisters') > -1;
        }
    }

    public isAthlet() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.roles) {
            return currentUser.roles.indexOf('athlet') > -1;
        }
    }

    public logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    private isExpired(dateStr: string) {
        const now = new Date();
        const date = new Date(Number(dateStr));

        return date < now;
    }
}