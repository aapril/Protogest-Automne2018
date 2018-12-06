import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../router.animations';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { LoginService } from './login.service';
import { first } from 'rxjs/operators';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    loginform: FormGroup;
    loading = false;    
    submitted: boolean = false; 
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder, 
        private loginService: LoginService,
        private route: ActivatedRoute,
        private router: Router) { }                

    ngOnInit() {             
        this.loginform = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
          });
          // reset login status   
          this.loginService.logout();

          // get return url from route parameters or default to '/'
          this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginform.controls; }

 
    onLoggedin() {        
        this.submitted = true;

       // stop here if form is invalid
        if (this.loginform.invalid) {
            console.log(true)
            return;
        }         
       
        this.loginService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    //this.router.navigate([this.returnUrl]);
                    this.router.navigate(['/dashboard']);
                });
        
        //localStorage.setItem('isLoggedin', 'true');
    }
}
