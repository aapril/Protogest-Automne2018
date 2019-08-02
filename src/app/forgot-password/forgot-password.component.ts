import { Component, OnInit, NgModule } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { routerTransition } from '../router.animations';
import { ProtocolService } from '../shared/services/protocol.service';

@NgModule({
    imports: [NgbModule]
})

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  animations: [routerTransition()]
})
export class ForgotPasswordComponent  implements OnInit {
    forgotPassform  = new FormGroup({
        email: new FormControl('', [
            Validators.required,
            Validators.pattern(
                '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'
            )
        ]),
        password: new FormControl('', Validators.required),
        code: new FormControl('', Validators.required)
    });
    userProtocol = [];
    userRelatedProtocol = [];
    langueProtocol: string = this.translate.currentLang;
    profilData;
    confirmCode = false;
    public isViewable = false;
    public errorMessageSent = false;
    public errorMessageReset = false;
    public successSent = false;
    public successReset = false;
    public errorMessage;

   constructor(private protocolService: ProtocolService, protected http: HttpClient, private router: Router, private translate: TranslateService) {}

    ngOnInit() {
        this.protocolService.getUserAttribute().subscribe(
            data => {
                this.userRelatedProtocol = data;
                this.profilData = data[0];
            }
        );

    }

    get email() {
        return this.forgotPassform.get('email');
    }

    get code() {
        return this.forgotPassform.get('code');
    }

    get password() {
        return this.forgotPassform.get('password');
    }

    forgotPass() {
        this.protocolService.forgotPassword(this.forgotPassform.get('email').value).subscribe(
            data => {
                this.userRelatedProtocol = data;
                this.isViewable = true;
                this.successSent = true;
            },
            err => {
                this.errorMessageSent = true;
            }
        );

    }

    confirmPassword() {
        this.protocolService.confirmPassword(this.forgotPassform.get('email').value, this.forgotPassform.get('password').value, this.forgotPassform.get('code').value).subscribe(
            data => {
                this.userRelatedProtocol = data;
                this.router.navigate(["/login"]);
                this.successReset = true;

            },
            err => {
                this.errorMessageReset = true;
            }
        );

    }

    changeLang(language: string) {
        this.translate.use(language);
        this.langueProtocol = this.translate.currentLang;
    }
}
