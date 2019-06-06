import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    readonly ENDPOINT_URL_BASE = 'http://192.168.1.121:8080/';

    constructor(private http: HttpClient) {
    }

    public login(username: string, password: string) {
        return this.http.post<any>(this.ENDPOINT_URL_BASE + 'auth/token', { username, password })
            .pipe(map(user => {
                console.log('user: ' + user);
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            }));
    }

    public getCurrentUser() {
        return localStorage.getItem('currentUser');
    }

    public isLoggedIn() {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
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
        //location.reload();
    }
}