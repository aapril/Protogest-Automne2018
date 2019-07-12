import {Component, OnInit, ElementRef, ViewChild, Output} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CreateEventComponent } from '../create-event/create-event.component';
import { ScheduleComponent } from '../schedule/schedule.component';
import { ProtocolService } from '../../shared/services/protocol.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
   userProtocol = [];
   userRelatedProtocol = [];
   afficherList  = true;
   afficherProtocol = false;
   afficherCalendar = false;
    private protocolSchemas: any | undefined = null;

   constructor(private protocolService: ProtocolService, protected http: HttpClient, private createEvent: CreateEventComponent , private scheduleComponent: ScheduleComponent, private router: Router, private translate: TranslateService) {
       this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de']);
       this.translate.setDefaultLang('en');
       const browserLang = this.translate.getBrowserLang();
       this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de/) ? browserLang : 'en');
   }

  ngOnInit() {

    this.protocolService.getUserProtocols().subscribe(
        data => {
           this.userProtocol = data;

            this.http.get(environment.backendUrl + '/protocol-schemas').subscribe(response => {
                if (!response) {
                    throw new Error('Failed to communicate with server');
                }
                this.protocolSchemas = response;
                for (let z of this.userProtocol) {
                    if (this.protocolSchemas.filter(p => p.uuid.toLowerCase().includes(z.protocolUuid))[0])  {
                        z.protocolName = this.protocolSchemas.filter(p => p.uuid.toLowerCase().includes(z.protocolUuid))[0].name + ' - ' + String(z.creationDate).replace('T04:00:00.000Z','');
                    }else{
                        z.protocolName = String(z.creationDate).replace('T04:00:00.000Z','');
                    }
                    console.log(z);
                }
                this.userProtocol.sort(sortByProperty('protocolName'));
            });


        }
      );

      var sortByProperty = function (property) {
          return function (x, y) {
              return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));
          };
      };

      this.protocolService.getUserRelatedProtocols().subscribe(
        data => {
           this.userRelatedProtocol = data;
        }
      );



  }

  showProtocolCalendar(data) {
    this.router.navigateByUrl('/schedule?id=' + data.uuid);
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
