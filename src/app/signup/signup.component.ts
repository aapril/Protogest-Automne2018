import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../router.animations';
import {FormGroup, FormControl} from '@angular/forms';
import {Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {User} from '../user';
import {Member} from '../layout/member/member';
import {AuthorizationService} from '../shared/authorization.service';
import {SignupResponse} from './SignupResponse';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {
    user: User;

    userId: number;
    member: Member;
    signupForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
        password: new FormControl('', Validators.required),
        passwordConfirmation: new FormControl('', Validators.required),
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
    });
    codeVerifForm = new FormGroup({
        code: new FormControl('', Validators.required)
    });
    errorMessage: boolean;
    strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
    confirmCode: boolean = false;
    codeWasConfirmed: boolean = false;

    constructor(private auth: AuthorizationService, private router: Router) {
    }

    ngOnInit() {

    }

    get email() {
        return this.signupForm.get('email');
    }

    get password() {
        return this.signupForm.get('password');
    }

    get passwordConfirmation() {
        return this.signupForm.get('passwordConfirmation');
    }

    get firstName() {
        return this.signupForm.get('firstName');
    }

    get lastName() {
        return this.signupForm.get('lastName');
    }

    get code() {
        return this.codeVerifForm.get('code');
    }

    register(): void {

        if (!this.signupForm.get('email').invalid &&
            !this.signupForm.get('password').invalid &&
            !this.signupForm.get('passwordConfirmation').invalid &&
            !this.signupForm.get('firstName').invalid &&
            !this.signupForm.get('lastName').invalid) {
            if (this.signupForm.get('password').value === this.signupForm.get('passwordConfirmation').value) {
                if (this.strongRegex.test(this.signupForm.get('password').value)) {
                    // TODO : TODOX : ajouter les fields donnes utilisateur dans la fonction register et le call backend de cognito
                    this.auth.register(this.signupForm.get('email').value, this.signupForm.get('password').value).subscribe(
                        (data: SignupResponse) => {
                            // this.router.navigate(['/login']);
                            this.confirmCode = true;
                        },
                        (err) => {
                            console.log(err);
                            alert('Registration Error has occurred');
                            alert(err.toString());
                        }
                    );
                } else {
                    alert('Password is not strong enough. It needs an uppercase letter, a numeric character and a special character.');
                }
            } else {
                alert('Password does not match with the password confirmation.');
            }

        }
    }

    validateAuthCode() {
        if (!this.codeVerifForm.get('code').invalid) {
            this.auth.confirmAuthCode(this.codeVerifForm.get('code').value).subscribe(
                (data) => {
                    //this._router.navigateByUrl('/');
                    this.codeWasConfirmed = true;
                    this.confirmCode = false;
                },
                (err) => {
                    alert('Confirm Authorization Error has occurred');
                });
        }
    }
}

