import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../router.animations';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { LoginService } from './login.service';
import {AuthorizationService} from "../shared/authorization.service";
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment'

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
		private http: HttpClient
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
		this.loginService.login(this.f.username.value, this.f.password.value).subscribe(response => {
			if(!response.success || response === null || response.payload === null || !response.payload["ACCESS_TOKEN"]){
				if(response.message === 'NeedToResetPassword'){
                	this.confirmCode = true;
				}
				this.cognitoErrorMsg = response.message;
				this.emailVerificationMessage = false;
				this.cognitoError = true;
			}else{
				localStorage.setItem("currentUser", JSON.stringify(response.payload));
				this.router.navigate(['/schedule']);
			}
		})
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
