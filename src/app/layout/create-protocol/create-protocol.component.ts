import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CreateEventComponent } from '../create-event/create-event.component'

@Component({
  selector: 'app-create-protocol',
  templateUrl: './create-protocol.component.html',
  styleUrls: ['./create-protocol.component.scss'],
  providers: [CreateEventComponent]
})
export class CreateProtocolComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder, private createEvent: CreateEventComponent) {}

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
  }

  saveForm() {
    this.createEvent.saveForm();
  }

}
