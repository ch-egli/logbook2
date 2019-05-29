import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    readonly ENDPOINT_URL_BASE = 'http://192.168.1.121:8080/';

    constructor(private http: HttpClient) {
    }

    login(username: string, password: string) {
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
            // logged in so return true
            console.log('AuthenticationService: isLoggedIn: true');
            return true;
        } else {
            console.log('AuthenticationService: isLoggedIn: false');
            return false;
        }
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        location.reload(true);
    }
}