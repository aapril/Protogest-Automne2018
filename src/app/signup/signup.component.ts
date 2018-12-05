import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../user.service';
import { User } from '../user';
import { Member } from '../layout/member/member';
import { MemberService } from '../layout/member/member.service';

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
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        passwordConfirmation: new FormControl('', Validators.required),
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
    });
    errorMessage: boolean;



    constructor(private userService: UserService, private memberService: MemberService, private router: Router) {}

    ngOnInit() {

    }

    get username() {
        return this.signupForm.get('username');
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

    get email() {
        return this.signupForm.get('email');
    }


    register(): void {



        this.errorMessage = true;




        if (!this.signupForm.get('username').invalid && !this.signupForm.get('password').invalid &&
            !this.signupForm.get('passwordConfirmation').invalid && !this.signupForm.get('firstName').invalid &&
            !this.signupForm.get('lastName').invalid && !this.signupForm.get('email').invalid) {
            if (this.signupForm.get('password').value === this.signupForm.get('passwordConfirmation').value) {


                this.user = {
                    id: null,
                    username: this.signupForm.get('username').value,
                    password: this.signupForm.get('password').value
                };


                const observableUser = this.userService.createUser(this.user);

                observableUser.subscribe(user => {
                    this.userId = user.id;


                    this.member = {
                        id: null,
                        firstName: this.signupForm.get('firstName').value,
                        lastName: this.signupForm.get('lastName').value,
                        email: this.signupForm.get('email').value,
                        userId: this.userId
                    };


                    const observableMember = this.memberService.createMember(this.member);
                    observableMember.subscribe();
                    if (observableUser != null && observableMember != null) {
                        alert('The user is successfully created');
                        this.router.navigate(['/login']);
                    }

                });


            } else {
                alert('Password does not match with the password confirmation.');
            }

        }
      }
    }

