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
    user: User;
    users: User[];

    constructor(private userService: UserService) {}

    ngOnInit() {
        this.getUsers();
    }

    getUsers(): void {
/*        this.users = [
            {
                username: 'hay',
                email: 'hay@.com',
                roles: ['hay']
            }
        ]
        this.userService.getUsers().subscribe(users => this.users = users);


        this.users = [new User()];*/
    }

    register(usernameFromTemplate: string, roleFromTemplate: string, emailFromTemplate: string): void {


        this.users = [];

        if (roleFromTemplate !== 'Choose a role') {
            this.user = {
                username: usernameFromTemplate,
                roles: [roleFromTemplate],
                email: emailFromTemplate
            };


            let observable = this.userService.createUser(this.user);

            observable.subscribe();
        }
    }
}
