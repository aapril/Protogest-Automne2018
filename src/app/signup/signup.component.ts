import { Component, OnInit } from "@angular/core";
import { routerTransition } from "../router.animations";
import { FormGroup, FormControl } from "@angular/forms";
import { Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { User } from "../user";
import { Member } from "../layout/member/member";
import { AuthorizationService } from "../shared/authorization.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Component({
    selector: "app-signup",
    templateUrl: "./signup.component.html",
    styleUrls: ["./signup.component.scss"],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {
    user: User;

    userId: number;
    member: Member;
    signupForm = new FormGroup({
        email: new FormControl("", [
            Validators.required,
            Validators.pattern(
                "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
            )
        ]),
        password: new FormControl("", Validators.required),
        passwordConfirmation: new FormControl("", Validators.required),
        firstName: new FormControl("", Validators.required),
        lastName: new FormControl("", Validators.required)
    });
    codeVerifForm = new FormGroup({
        code: new FormControl("", Validators.required)
    });
    errorMessage: boolean;
    strongRegex = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    confirmCode: boolean = false;
    codeWasConfirmed: boolean = false;

    constructor(private router: Router, private http: HttpClient) {}

    ngOnInit() {}

    get email() {
        return this.signupForm.get("email");
    }

    get password() {
        return this.signupForm.get("password");
    }

    get passwordConfirmation() {
        return this.signupForm.get("passwordConfirmation");
    }

    get firstName() {
        return this.signupForm.get("firstName");
    }

    get lastName() {
        return this.signupForm.get("lastName");
    }

    get code() {
        return this.codeVerifForm.get("code");
    }

    register(): void {
        if (
            !this.signupForm.get("email").invalid &&
            !this.signupForm.get("password").invalid &&
            !this.signupForm.get("passwordConfirmation").invalid &&
            !this.signupForm.get("firstName").invalid &&
            !this.signupForm.get("lastName").invalid
        ) {
            if (
                this.signupForm.get("password").value ===
                this.signupForm.get("passwordConfirmation").value
            ) {
                if (
                    this.strongRegex.test(this.signupForm.get("password").value)
                ) {
                    const data = new FormData();
                    data.append("email", this.signupForm.get("email").value);
                    data.append(
                        "password",
                        this.signupForm.get("password").value
                    );
                    this.http
                        .post<any>(
                            environment.backendUrl + "/users/signup",
                            data
                        )
                        .subscribe(response => {
                            if (!response || !response.success) {
                                alert(response.message);
                            } else {
                                this.router.navigate(["/login"]);
                            }
                        });
                } else {
                    alert(
                        "Password is not strong enough. It needs an uppercase letter, a numeric character and a special character."
                    );
                }
            } else {
                alert(
                    "Password does not match with the password confirmation."
                );
            }
        }
    }
}
