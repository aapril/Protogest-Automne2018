import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../user.service';
import { User } from '../user';
import { Member } from '../layout/member/member';
import { MemberService } from '../layout/member/member.service';
import {AuthorizationService} from "../shared/authorization.service";

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
    errorMessage: boolean;
    strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    constructor(private auth: AuthorizationService, private userService: UserService, private memberService: MemberService, private router: Router) {}

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

    register(): void {

        if (!this.signupForm.get('email').invalid &&
            !this.signupForm.get('password').invalid &&
            !this.signupForm.get('passwordConfirmation').invalid && 
            !this.signupForm.get('firstName').invalid &&
            !this.signupForm.get('lastName').invalid) {
            if (this.signupForm.get('password').value === this.signupForm.get('passwordConfirmation').value) {
                if (this.strongRegex.test(this.signupForm.get('password').value)) {
                    this.auth.register(this.signupForm.get('email').value, this.signupForm.get('password').value).subscribe(
                        (data) => {
                            this.router.navigate(['/login']);
                        },
                        (err) => {
                            console.log(err);
                            alert("Registration Error has occurred");
                        }
                    );

                    // this.user = {
                    //     id: null,
                    //     email: this.signupForm.get('email').value,
                    //     password: this.signupForm.get('password').value
                    // };

                    // const observableUser = this.userService.createUser(this.user);

                    // observableUser.subscribe(user => {
                    //     this.userId = user.id;
                    //     this.member = {
                    //         id: null,
                    //         firstName: this.signupForm.get('firstName').value,
                    //         lastName: this.signupForm.get('lastName').value,
                    //         email: this.signupForm.get('email').value,
                    //         userId: this.userId
                    //     };
                    //     const observableMember = this.memberService.createMember(this.member);
                    //     observableMember.subscribe();

                    //     if (observableUser != null && observableMember != null) {
                    //         alert('The user is successfully created');
                    //         this.router.navigate(['/login']);
                    //     }
                    // });
                }
                else {
                    alert('Password is not strong enough. It needs an uppercase letter, a numeric character and a special character.');
                }
            } else {
                alert('Password does not match with the password confirmation.');
            }

        }
      }
    }

