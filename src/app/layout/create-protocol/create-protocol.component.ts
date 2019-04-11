import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CreateEventComponent } from '../create-event/create-event.component';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-protocol',
  templateUrl: './create-protocol.component.html',
  styleUrls: ['./create-protocol.component.scss'],
  providers: [CreateEventComponent]
})
export class CreateProtocolComponent implements OnInit {
  @ViewChild('openModal') openModal:ElementRef;
  @ViewChild('openOccupiedDatesModal') openOccupiedDatesModal:ElementRef;
  occupiedDates: any = [];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  backendUrlForOutlook: String = "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=eaa9e663-4d2c-4552-98e9-e525a11d27e5&redirect_uri="+environment.backendUrl+"/authorize&response_type=code%20id_token&scope=openid%20offline_access%20profile%20User.Read%20Mail.Read%20Calendars.Read%20Contacts.Read&state=5a2853cd-b18d-4805-8443-07db6068be95&nonce=62489277-35b9-44bc-a6d7-cd1887144cc4&response_mode=form_post";

  constructor(private _formBuilder: FormBuilder, private createEvent: CreateEventComponent, private route: ActivatedRoute) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
    this.route.queryParams.subscribe((params)=> {
      if(params['dates']){
        this.filterSendOutlookDates(params['dates']);
      } else {
        this.openModal.nativeElement.click();
      }
    });
  }

  saveForm() {
    this.createEvent.saveForm();
  }

  filterSendOutlookDates(rawOutlookDates) {
    let outlookDates = rawOutlookDates.split(',');
    outlookDates = outlookDates.map(s => s.trim());
    outlookDates = outlookDates.filter(function(item, pos) { return outlookDates.indexOf(item) == pos; });
    this.occupiedDates = outlookDates;
    localStorage.setItem('occupiedDates', JSON.stringify(outlookDates));
    // Put modal here
    this.openOccupiedDatesModal.nativeElement.click();
  }

}
