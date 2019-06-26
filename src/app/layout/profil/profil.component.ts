import {Component, OnInit, NgModule} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { CreateEventComponent } from '../create-event/create-event.component';
import { ProtocolService } from '../../shared/services/protocol.service';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [NgbModule]
})

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
  providers: [CreateEventComponent]
})
export class ProfilComponent  implements OnInit {
    userProtocol = [];
    userRelatedProtocol = [];
    langueProtocol: string = this.translate.currentLang;
    profilData;
    profilForm = new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
    });
    passwordForm = new FormGroup({
        oldPassword: new FormControl('', Validators.required),
        newPassword: new FormControl('', Validators.required),
    });

   constructor(private protocolService: ProtocolService, protected http: HttpClient, private createEvent: CreateEventComponent, private router: Router, private translate: TranslateService) {}

    ngOnInit() {
        this.protocolService.getUserAttribute().subscribe(
            data => {
                this.userRelatedProtocol = data;
                this.profilData = data[0];
            }
        );
    }
    get firstName() {
        return this.profilForm.get('firstName');
    }

    get lastName() {
        return this.profilForm.get('lastName');
    }

    updateProfil() {
        this.protocolService.setUserAttribute(this.profilForm.get('firstName').value, this.profilForm.get('lastName').value).subscribe(
            data => {
                this.userRelatedProtocol = data;
            }
        );
        const localProtocol = localStorage.getItem('profil');
        console.log(localProtocol);
    }

    changePassword() {
        this.protocolService.changePassword(this.passwordForm.get('oldPassword').value, this.passwordForm.get('newPassword').value).subscribe(
            data => {
                this.userRelatedProtocol = data;
            }
        );
        const localProtocol = localStorage.getItem('profil');
        console.log(localProtocol);

    }

    changeLang(language: string) {
        this.translate.use(language);
        this.langueProtocol = this.translate.currentLang;
    }
}
