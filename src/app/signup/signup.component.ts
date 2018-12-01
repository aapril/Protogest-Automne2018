import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
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
 //   users: User[];
    userId: number;
    member: Member;

    constructor(private userService: UserService, private memberService: MemberService) {}

    ngOnInit() {
//        this.getUsers();
    }

    getUsers(): void {
  /*      this.users = [
            {
                username: 'hay',
                email: 'hay@.com',
                roles: ['hay']
            }
        ]
        this.userService.getUsers().subscribe(users => this.users = users);


        this.users = [new User()];*/
    }

    register(usernameFromTemplate: string, passwordFromTemplate: string, passwordConfirmationFromTemplate: string,
             firstNameFromTemplate: string, lastNameFromTemplate: string, emailFromTemplate: string): void {



 //       this.users = [];


/*        if (roleFromTemplate !== 'Choose a role') {
            this.user = {
                username: usernameFromTemplate,
                roles: [roleFromTemplate],
                email: emailFromTemplate
            };*/

        this.user = {
            id: null,
            username: usernameFromTemplate,
            password: passwordFromTemplate
        };

        console.log(this.user);

            let observableUser = this.userService.createUser(this.user);

           observableUser.subscribe(user => {
               this.userId = user.id;
               console.log(this.userId);

               this.member = {
                   id: null,
                   firstName: firstNameFromTemplate,
                   lastName: lastNameFromTemplate,
                   email: emailFromTemplate,
                   userId: this.userId
               };

               console.log(this.member);
               const observableMember = this.memberService.createMember(this.member);
               observableMember.subscribe();
           });

  /*      if (this.userId != null) {

            console.log('inside if condition');
            this.member = {
                id: null,
                firstName: firstNameFromTemplate,
                lastName: lastNameFromTemplate,
                email: emailFromTemplate,
                userId: this.userId
            };

            console.log(this.member);
            const observableMember = this.memberService.createMember(this.member);
            observableMember.subscribe();
        }*/

        }
    }

