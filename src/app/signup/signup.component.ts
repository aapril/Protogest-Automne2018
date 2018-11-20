import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { MemberService } from '../member.service';
import { Member } from '../member';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {

    member: Member;
    members: Member[];

    constructor(private memberService: MemberService) {}

    ngOnInit() {}

    register(firstNameFromTemplate: string, lastNameFromTemplate: string, emailFromTemplate: string): void {

        this.member = {
            firstName: firstNameFromTemplate,
            lastName: lastNameFromTemplate,
            email: emailFromTemplate
        }
        this.memberService.createMember(this.member).subscribe(member => this.members.push(member));
    }
}
