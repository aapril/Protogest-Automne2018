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

    }

    getUsers(): void {

    }

    register(usernameFromTemplate: string, passwordFromTemplate: string, passwordConfirmationFromTemplate: string,
             firstNameFromTemplate: string, lastNameFromTemplate: string, emailFromTemplate: string): void {

        if (passwordFromTemplate === passwordConfirmationFromTemplate) {

           console.log(emailFromTemplate.search('@'));

           if (emailFromTemplate.search('@') !== -1) {

               this.user = {
                   id: null,
                   username: usernameFromTemplate,
                   password: passwordFromTemplate
               };

               console.log(this.user);

               const observableUser = this.userService.createUser(this.user);

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
           } else {
               alert('Enter valid email');
           }

        } else {
            alert('Mots de passe sont différents');
        }
      }
    }

