import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreateEventComponent } from '../create-event/create-event.component';
import { CreateTemplateComponent } from '../create-template/create-template.component';
import { ActivatedRoute } from '@angular/router';
import { generateOutlookAuthUrl } from '../../utils/outlookHelper.js';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-create-protocol',
  templateUrl: './create-protocol.component.html',
  styleUrls: ['./create-protocol.component.scss'],
  providers: [CreateEventComponent, CreateTemplateComponent]
})
export class CreateProtocolComponent implements OnInit {
  @ViewChild('openModal') openModal: ElementRef;
  @ViewChild('openOccupiedDatesModal') openOccupiedDatesModal: ElementRef;
  Protocol: string = "quebec";
  selectedSections: any = [];
  occupiedDates: any = [];
  inviteEmail = '';
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  backendUrlForOutlook: String = generateOutlookAuthUrl();

  // HTTP aware stuff
  protocolSchemas: any = []
  selectedSchema: any = {
    protocolFields: []
  }

  constructor(private _formBuilder: FormBuilder, private http: HttpClient, private createEvent: CreateEventComponent, private createTemplate: CreateTemplateComponent, private route: ActivatedRoute, private translate: TranslateService) {}

  ngOnInit() {
      localStorage.setItem('protocolName', this.Protocol);
    this.http.get(environment.backendUrl + "/protocol-schemas")
      .subscribe(data => {
        this.protocolSchemas = data
        this.selectedSchema = data[0]
      })

    localStorage.removeItem('occupiedDates');
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required]
    });
    this.route.queryParams.subscribe((params) => {
      if (params['dates']) {
        this.filterSendOutlookDates(params['dates']);
      } else {
        this.openModal.nativeElement.click();
      }
    });
  }

  saveForm() {
    this.createEvent.saveForm(this.inviteEmail);
  }

  filterSendOutlookDates(rawOutlookDates) {
    // This function seperate the values coming back from outlook, remove the unnecessary spaces
    // and filter the duplicates. We had issues with calling a setter in CreateEvent so we use the
    // localStorage as temporary space to keep them.
    let outlookDates = rawOutlookDates.split(',');
    outlookDates = outlookDates.map(s => s.trim());
    outlookDates = outlookDates.filter(function(item, pos) { return outlookDates.indexOf(item) == pos; });
    this.occupiedDates = outlookDates;
    localStorage.setItem('occupiedDates', JSON.stringify(outlookDates));
    this.openOccupiedDatesModal.nativeElement.click();
  }

  changeLang(language: string) {
      this.translate.use(language);
  }

  newProtocol(Protocol: string) {
      this.Protocol = Protocol;
      localStorage.setItem('protocolName', Protocol);
    console.log(this.Protocol);
      this.selectedSchema = this.protocolSchemas.filter(p =>
          p.name.toLowerCase().includes(this.Protocol)
      )[0]

      this.selectedSections = [];
  }
}
