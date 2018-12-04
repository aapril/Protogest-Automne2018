import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

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

    // Form values

    username: string;
    password: string;
    passwordConfirmation: string;
    firstName: string;
    lastName: string;
    email: string;

    constructor(private userService: UserService, private memberService: MemberService) {}

    ngOnInit() {

    }


    register(): void {

        this.username = this.signupForm.get('username').value;
        this.password = this.signupForm.get('password').value;
        this.passwordConfirmation = this.signupForm.get('passwordConfirmation').value;
        this.firstName = this.signupForm.get('firstName').value;
        this.lastName = this.signupForm.get('lastName').value;
        this.email = this.signupForm.get('email').value;

        console.log(this.username);
        console.log(this.email);

        if (this.password === this.passwordConfirmation) {


               this.user = {
                   id: null,
                   username: this.username,
                   password: this.password
               };


               const observableUser = this.userService.createUser(this.user);

               observableUser.subscribe(user => {
                   this.userId = user.id;


                   this.member = {
                       id: null,
                       firstName: this.firstName,
                       lastName: this.lastName,
                       email: this.email,
                       userId: this.userId
                   };


                   const observableMember = this.memberService.createMember(this.member);
                   observableMember.subscribe();
                   if (observableUser != null && observableMember != null) {
                        alert('The user is successfully created');
                   }

               });


        } else {
            alert('Password does not match with the password confirmation.');
        }
      }
    }

