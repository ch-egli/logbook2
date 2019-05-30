import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // reset login status
        // this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        console.log('ngOnInit Login - returnUrl: ' + this.returnUrl);
    }

    login() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        const val = this.loginForm.value;
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