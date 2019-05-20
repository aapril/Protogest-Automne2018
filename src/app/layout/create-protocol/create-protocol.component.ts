import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreateEventComponent } from '../create-event/create-event.component';
import { ActivatedRoute } from '@angular/router';
import { generateOutlookAuthUrl } from '../../utils/outlookHelper.js';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-protocol',
  templateUrl: './create-protocol.component.html',
  styleUrls: ['./create-protocol.component.scss'],
  providers: [CreateEventComponent]
})
export class CreateProtocolComponent implements OnInit {
  @ViewChild('openModal') openModal: ElementRef;
  @ViewChild('openOccupiedDatesModal') openOccupiedDatesModal: ElementRef;
  occupiedDates: any = [];
  inviteEmail = '';
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  backendUrlForOutlook: String = generateOutlookAuthUrl();

  constructor(private _formBuilder: FormBuilder, private createEvent: CreateEventComponent, private route: ActivatedRoute, private translate: TranslateService) {}

  ngOnInit() {
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
}
