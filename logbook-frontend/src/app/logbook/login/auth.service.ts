import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable()
export class AuthService {
    // readonly ENDPOINT_URL_BASE = 'http://192.168.1.121:8080/';
    readonly ENDPOINT_URL_BASE = 'http://localhost:8080/';

    public httpOptions;

    constructor(private http: HttpClient) {
        // let headersObj = new HttpHeaders();
        // headersObj.append('Content-Type', 'application/x-www-form-urlencoded');
        // headersObj.append('Authorization', 'Basic bG9nYm9va0FuZ3VsYXJDbGllbnQ6bXlBYmNkZ2hpajk4NzZTZWNyZXQ=')
        // headers.append("Authorization", "Basic " + btoa("username:password"));

        const headersObj = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Basic bG9nYm9va0FuZ3VsYXJDbGllbnQ6bXlBYmNkZ2hpajk4NzZTZWNyZXQ='
        });

        this.httpOptions = {
            headers: headersObj,
        };
    }

    login(username: string, password: string) {
        return this.http.post<any>(
            this.ENDPOINT_URL_BASE + 'oauth/token',
            {
                grant_type: 'password',
                username: username,
                password: password
            },
            this.httpOptions
        )
            .pipe(
                tap(res => this.setSession),
                shareReplay()
            );

        /*
        service.$log.debug('get a token from of auth-server.');
        service.$http.post(service.config.authServerUrl + 'oauth/token',
            service.$httpParamSerializer({
                'grant_type': 'password',
                'client_id': service.config.authClientId,
                'username': benutzername,
                'password': passwort
            }),
            {
                headers: service._getAppAuthHeader()
            }).success(response => {
                service._handleLoginResponse(response);
            }).error(err => {
                service._handleErrorResponse(err, true);
            });

            _getAppAuthHeader() {
                return {
                    'Authorization': 'Basic ' + btoa(this.config.authClientId + ':' + this.config.authClientSecret),
                    'Content-Type': 'application/x-www-form-urlencoded'
                };
            }
        */
    }

    private setSession(authResult) {
        console.log('authResult: ' + authResult);
        const expiresAt = moment().add(authResult.expiresIn, 'second');

        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    }

    logout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem('expires_at');
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }
}
