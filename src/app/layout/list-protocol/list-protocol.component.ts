import {Component, OnInit } from '@angular/core';
import { CreateEventComponent } from '../create-event/create-event.component';
import { ScheduleComponent } from '../schedule/schedule.component';
import { ProtocolService } from '../../shared/services/protocol.service';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {environment} from '../../../environments/environment';


@Component({
    selector: 'app-list-protocol',
    templateUrl: './list-protocol.component.html',
    styleUrls: ['./list-protocol.component.scss'],
    providers: [CreateEventComponent, ScheduleComponent]
})
export class ListProtocolComponent implements OnInit {
    userProtocolActif = [];
    userProtocolArchived = [];
    userProtocolRejected = [];
    userProtocolPending = [];
    userRelatedProtocolActif = [];
    userRelatedProtocolArchived = [];
    userRelatedProtocolRejected = [];
    userRelatedProtocolPending = [];
    afficherList  = true;
    afficherProtocol = false;
    afficherCalendar = false;
    private protocolSchemas: any | undefined = null;
    protocolSchema: any = [];

    constructor(private protocolService: ProtocolService, protected http: HttpClient, private createEvent: CreateEventComponent , private scheduleComponent: ScheduleComponent, private router: Router, private translate: TranslateService) {
        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de/) ? browserLang : 'en');
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
                this.protocolService.getProtocolSchema().subscribe(
                    data2 => {
                        this.protocolSchema = data2;

                        this.userProtocolActif = this.userProtocolActif.map(protocol => formatProtocolName(protocol, this.protocolSchema));
                        this.userProtocolActif.sort(sortByProperty('protocolName'));

                        this.userProtocolRejected = this.userProtocolRejected.map(protocol => formatProtocolName(protocol, this.protocolSchema));
                        this.userProtocolRejected.sort(sortByProperty('protocolName'));

                        this.userProtocolPending = this.userProtocolPending.map(protocol => formatProtocolName(protocol, this.protocolSchema));
                        this.userProtocolPending.sort(sortByProperty('protocolName'));

                        this.userProtocolArchived = this.userProtocolArchived.map(protocol => formatProtocolName(protocol, this.protocolSchema));
                        this.userProtocolArchived.sort(sortByProperty('protocolName'));
                    }
                );
            }
        );

        const sortByProperty = function (property) {
            return function (y, x) {
                return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));
            };
        };

        const formatProtocolName = function (protocol, protocolSchema) {
            for (const z of protocolSchema) {
                if (protocol.protocolUuid === z.uuid) {
                    return ({ ...protocol, protocolName: protocol.name ? String(protocol.creationDate).replace('T04:00:00.000Z', '') + ' - ' + protocol.name
                            : String(protocol.creationDate).replace('T04:00:00.000Z', '') + ' - Unamed protocol', gabaritName: z.description});
                }
            }
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

                this.userRelatedProtocolActif = this.userRelatedProtocolActif.map(protocol => formatProtocolName(protocol, this.protocolSchema));
                this.userRelatedProtocolActif.sort(sortByProperty('protocolName'));

                this.userRelatedProtocolRejected = this.userRelatedProtocolRejected.map(protocol => formatProtocolName(protocol, this.protocolSchema));
                this.userRelatedProtocolRejected.sort(sortByProperty('protocolName'));

                this.userRelatedProtocolPending = this.userRelatedProtocolPending.map(protocol => formatProtocolName(protocol, this.protocolSchema));
                this.userRelatedProtocolPending.sort(sortByProperty('protocolName'));

                this.userRelatedProtocolArchived = this.userRelatedProtocolArchived.map(protocol => formatProtocolName(protocol, this.protocolSchema));
                this.userRelatedProtocolArchived.sort(sortByProperty('protocolName'));
            }
        );



    }

  showProtocolCalendar(data) {
    this.router.navigateByUrl('/schedule?id=' + data.uuid);
  }

    send(data) {
        const index = this.userProtocolActif.indexOf(data);
        this.userProtocolActif.splice(index, 1);
        this.userProtocolArchived.push(data);
    }

    deleteProtocol(data) {
        if (status === 'pending') {
            const index = this.userProtocolPending.indexOf(data);
            this.userProtocolPending.splice(index, 1);
        }
        if (status === 'actif') {
            const index = this.userProtocolActif.indexOf(data);
            this.userProtocolActif.splice(index, 1);
        }

        if (status === 'rejected') {
            const index = this.userProtocolRejected.indexOf(data);
            this.userProtocolRejected.splice(index, 1);
        }
    }

    downloadPdf(data) {
    }

    updateProtocol(data) {
        this.afficherList = false;
        this.afficherProtocol = true;
        this.createEvent.setData(data.fields);
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}
