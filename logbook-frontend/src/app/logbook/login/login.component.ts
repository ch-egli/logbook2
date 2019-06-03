import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../../_services';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    submitted = false;
    returnUrl: string;

    loginErrorMessage = '';

    constructor(private fb: FormBuilder,
        private authenticationService: AuthenticationService,
        private route: ActivatedRoute,
        private router: Router) {
    }

    ngOnInit(): void {
        // restore login values if user have previously logged in
        let rememberMe = false;
        let bn = '';
        let pw = '';

        const storedBenutzername = localStorage.getItem('bn');
        const storedRememberMe = (localStorage.getItem('rememberMe') === 'true');
        if (storedRememberMe && storedBenutzername) {
            rememberMe = true;
            bn = storedBenutzername;
            pw = localStorage.getItem('pw');
        }

        this.loginForm = this.fb.group({
            username: [bn, Validators.required],
            password: [pw, Validators.required],
            rememberMe: new FormControl(storedRememberMe),
        });

        console.log('ngInit: ' + rememberMe + ' ' + bn + ' ' + pw);

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        console.log('ngOnInit Login - returnUrl: ' + this.returnUrl);
    }

    login() {
        this.submitted = true;
        const val = this.loginForm.value;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        console.log('rememberMe: ' + val.rememberMe);
        // save login in localStorage for next access
        if (val.rememberMe === true) {
            localStorage.setItem('rememberMe', 'true');
            localStorage.setItem('bn', val.username);
            localStorage.setItem('pw', val.password);
        } else {
            localStorage.setItem('rememberMe', 'false');
            localStorage.setItem('bn', '');
            localStorage.setItem('pw', '');
        }

        if (val.username && val.password) {
            this.authenticationService.login(val.username, val.password)
                .subscribe(
                    () => {
                        console.log('User is logged in, navigateTo: ' + this.returnUrl);
                        this.route.queryParams.subscribe(
                            params => {
                                const retUrl = params['returnUrl'];
                                console.log('queryParams', retUrl);
                                this.router.navigate([(retUrl) ? retUrl : '/']);
                            }
                        );
                    },
                    error => {
                        console.log('Authentication error: ' + error);
                        this.loginErrorMessage = 'Fehler beim Login: Bitte versuche noch mal...';
                        this.loginForm.reset();
                        setTimeout(() => {
                            this.loginErrorMessage = '';
                        }, 3000);
                    }
                );
        }
    }
}