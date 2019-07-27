import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {ProtocolService} from '../../../shared/services/protocol.service';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    pushRightClass = 'push-right';
    userName: String;
    profilData;
    userProtocolActif = [];
    userProtocolArchived = [];
    userProtocolRejected = [];
    userProtocolPending = [];
    userRelatedProtocolActif = [];
    userRelatedProtocolArchived = [];
    userRelatedProtocolRejected = [];
    userRelatedProtocolPending = [];
    private protocolSchemas: any | undefined = null;

    constructor(private protocolService: ProtocolService, private translate: TranslateService, public router: Router, protected http: HttpClient) {

        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
        console.log(localStorage.getItem("currentUser"));


        this.protocolService.getUserAttribute().subscribe(
            data => {
                this.profilData = data[0];
                this.userName = this.profilData.name + " " + this.profilData.familyName;
            }
        );


    }

    ngOnInit() {

        this.protocolService.getUserProtocols().subscribe(
            data => {
                for (const z of data) {
                    if (z['status'] === 'APPROVED')  {
                        this.userProtocolActif.push(z);
                    }
                    if (z['status'] === 'REJECTED')  {
                        this.userProtocolRejected.push(z);
                    }
                    if (z['status'] === 'PENDING')  {
                        this.userProtocolPending.push(z);
                    }
                    if (z['status'] === 'ARCHIVE')  {
                        this.userProtocolArchived.push(z);
                    }
                }
            }
        );

        const sortByProperty = function (property) {
            return function (y, x) {
                return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));
            };
        };

        this.protocolService.getUserRelatedProtocols().subscribe(
            data => {


                for (const z of data) {
                    if (z['status'] === 'APPROVED')  {
                        this.userRelatedProtocolActif.push(z);
                    }
                    if (z['status'] === 'REJECTED')  {
                        this.userRelatedProtocolRejected.push(z);
                    }
                    if (z['status'] === 'PENDING')  {
                        this.userRelatedProtocolPending.push(z);
                    }
                    if (z['status'] === 'ARCHIVE')  {
                        this.userRelatedProtocolArchived.push(z);
                    }
                }

            }
        );
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}
