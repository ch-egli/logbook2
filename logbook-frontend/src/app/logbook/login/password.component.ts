import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';

import { MustMatch } from '../../core/_helpers/must-match.validator';
import { AuthenticationService } from '../../core/_services/authentication.service';

@Component({
    selector: 'app-password',
    templateUrl: './password.component.html',
    providers: [AuthenticationService]
})
export class PasswordComponent implements OnInit {
    passwordForm: FormGroup;
    submitted = false;
    returnUrl: string;

    msgs: Message[] = [];

    constructor(private fb: FormBuilder,
        private authenticationService: AuthenticationService,
        private router: Router) {
    }

    get oldPassword() { return this.passwordForm.get('oldPassword'); }
    get newPassword() { return this.passwordForm.get('newPassword'); }
    get confirmNewPassword() { return this.passwordForm.get('confirmNewPassword'); }

    ngOnInit(): void {
        this.passwordForm = this.fb.group({
            oldPassword: new FormControl(null, [Validators.required]),
            newPassword: new FormControl(null, [Validators.required, Validators.pattern('^(?=.*\\d).{5,}$')]),
            confirmNewPassword: new FormControl(null, [Validators.required, Validators.pattern('^(?=.*\\d).{5,}$')]),
        }, {
                validator: MustMatch('newPassword', 'confirmNewPassword')
            });
    }

    changePassword() {
        console.log('changePassword...');
        this.submitted = true;
        const val = this.passwordForm.value;

        if (val.oldPassword && val.newPassword) {
            this.authenticationService.changePassword(val.oldPassword, val.newPassword)
                .subscribe(
                    () => {
                        console.log('password successfully changed');
                        localStorage.setItem('rememberMe', 'false');
                        this.msgs.push({
                            severity: 'info', summary: 'Du hast dein Passwort erfolgreich geändert.',
                            detail: 'Bitte logge dich nun neu ein....'
                        });
                        setTimeout(() => {
                            this.router.navigate(['/login']);
                        }, 4000);
                    },
                    error => {
                        console.log('Change password error: ' + JSON.stringify(error));
                        this.msgs.push({
                            severity: 'error', summary: 'Bestehendes Password ist falsch. ',
                            detail: 'Bitte versuch noch einmal...'
                        });
                        this.passwordForm.reset();
                    }
                );
        }
    }

    public cancel() {
        this.passwordForm.reset();
        this.router.navigate(['/home']);
    }
}
