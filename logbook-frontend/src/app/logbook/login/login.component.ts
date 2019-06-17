import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';

import { AuthenticationService } from '../../core/_services/authentication.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    submitted = false;
    returnUrl: string;
    rememberMe = false;

    loginErrorMessage = '';

    constructor(private fb: FormBuilder,
        private authenticationService: AuthenticationService,
        private route: ActivatedRoute,
        private router: Router,
        private confirmationService: ConfirmationService) {
    }

    ngOnInit(): void {
        // restore login values if user have previously logged in
        let bn = '';
        let pw = '';

        const storedBenutzername = localStorage.getItem('bn');
        const storedRememberMe = (localStorage.getItem('rememberMe') === 'true');
        if (storedRememberMe && storedBenutzername) {
            bn = storedBenutzername;
            pw = atob(localStorage.getItem('pw')); // base64: decode
            this.rememberMe = storedRememberMe;
        }

        this.loginForm = this.fb.group({
            username: [bn, Validators.required],
            password: [pw, Validators.required],
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        console.log('ngOnInit Login - returnUrl: ' + this.returnUrl);

        // show version info only once
        const versionInfo = localStorage.getItem('versionInfo2.0.0');
        // console.log('versionInfo: ' + versionInfo);
        if (!versionInfo) {
            this.showNewVersion();
        }
    }

    login() {
        this.submitted = true;
        const val = this.loginForm.value;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        // save login in localStorage for next access
        if (this.rememberMe === true) {
            localStorage.setItem('rememberMe', 'true');
            localStorage.setItem('bn', val.username);
            localStorage.setItem('pw', btoa(val.password)); // base64 encode
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

    public showNewVersion() {
        this.confirmationService.confirm({
            message: `
            <div>
              <small>
                Hallo zäme<br>
                Dies ist eine neue Version des RZ BeO Climbing Logbook. 
                Eventuell funktioniert noch nicht alles fehlerfrei oder so, dass es für euch passt... 
                Also teilt mir doch Fehler oder Wünsche einfach per E-Mail mit: 
                <a href="mailto:christian.egli4@gmail.com">christian.egli4@gmail.com</a>. 
                Meine E-Mail Adresse findet ihr auch im Menü "Über das Climbing Logbook."<br>
                Viel Spass! Christian Egli
              </small>
            </div>`,
            accept: () => {
                // console.log('new version info...');
                localStorage.setItem('versionInfo2.0.0', 'done');
            }
        });
    }

}
