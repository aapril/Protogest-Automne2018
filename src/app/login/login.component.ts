import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../router.animations';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { LoginService } from './login.service';
import {AuthorizationService} from "../shared/authorization.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    loginform: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    cognitoErrorMsg: string;
    emailVerificationMessage = false;
    cognitoError = false;
    confirmCode: boolean = false;
    codeWasConfirmed: boolean = false;

    codeVerifForm = new FormGroup({
        code: new FormControl('', Validators.required)
    });

    constructor(
        private auth: AuthorizationService,
        private formBuilder: FormBuilder,
        private loginService: LoginService,
        private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit() {
        this.cognitoErrorMsg = "";

        this.loginform = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
          });
          // reset login status
          this.loginService.logout();

          // get return url from route parameters or default to '/'
          this.returnUrl = this.route.snapshot.queryParams['/schedule'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginform.controls; }

    get code() {
        return this.codeVerifForm.get('code');
    }


    onLoggedin() {
        this.submitted = true;

       // stop here if form is invalid
        if (this.loginform.invalid) {
            this.cognitoError = false;
            this.emailVerificationMessage = true;
            return;
        }         
       
        this.auth.signIn(this.f.username.value, this.f.password.value).subscribe((data) => {
            localStorage.setItem('currentUser', this.f.username.value);
            this.router.navigate(['/list-protocol']);
        }, (err)=> {
            if (err.code === "UserNotConfirmedException") {
                this.confirmCode = true;
            }
            this.cognitoErrorMsg = err.message;
            this.emailVerificationMessage = false;
            this.cognitoError = true;
        });   

    }

    printEvents() {
       this.loginService.printEvents();
    }

    validateAuthCode() {
        if (!this.codeVerifForm.get('code').invalid) {
            this.auth.confirmAuthCodeWithUsername(this.codeVerifForm.get('code').value, this.f.username.value).subscribe(
              (data) => {
                //this._router.navigateByUrl('/');
                this.codeWasConfirmed = true;
                this.confirmCode = false;
                this.onLoggedin();
              },
              (err) => {
                alert("Confirm Authorization Error has occurred");
              });
        }
    }
}
