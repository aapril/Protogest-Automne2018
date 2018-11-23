import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {

//    member: Member;
//    members: Member[];
    user: User;
    users: User[];

    constructor(private userService: UserService) {}

    ngOnInit() {
        this.getUsers();
    }

    getUsers(): void {
        this.users = [
            {
                username: 'hay',
                email: 'hay@.com',
                roles: ['hay']
            }
        ]
        this.userService.getUsers().subscribe(users => this.users = users);
        console.log(this.users + 'it is right');
        console.log(this.users.toString());

        this.users = [new User()];
    }

    register(usernameFromTemplate: string, roleFromTemplate: string, emailFromTemplate: string): void {
        console.log(this.users + 'opengl');
         this.users = [];

        this.user = {
            username: usernameFromTemplate,
            roles: [roleFromTemplate],
            email: emailFromTemplate
        };

        console.log(this.user.username);
        console.log(this.user.email);
        console.log(this.user.roles);
        console.log(this.users);
        let observable = this.userService.createUser(this.user);


        observable.subscribe();
        observable.subscribe();

        console.log('finished execution');
    }
}
