import {Component, OnInit, ViewChild} from '@angular/core';
import {Event, EventService} from '../../shared/services/event.service';
import { CreateEvent } from './create-event';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { TimepickerBasicComponent } from '../../timepicker-basic/timepicker-basic.component';

import { Observable } from 'rxjs';
import { MemberService } from '../member/member.service';
import { Member } from '../member/member';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

    @ViewChild(TimepickerBasicComponent) timePicker: TimepickerBasicComponent;



    event: CreateEvent;

    createEventForm = new FormGroup({
        name: new FormControl('', Validators.required),
        date: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        hours: new FormControl('', Validators.required),
        minutes: new FormControl('', Validators.required),
        seconds: new FormControl('', Validators.required)
        });

    errorMessage: boolean;
    timePickerMessage: boolean;

    eventDateTime: string;
    eventYear: string;
    eventMonth: string;
    eventDay: string;

    formatedHours: string;
    formatedMinutes: string;

  constructor(private eventService: EventService, private router: Router) { }

  ngOnInit() {

  }


    get name() {
        return this.createEventForm.get('name');
    }

    get date() {
        return this.createEventForm.get('date');
    }

    get description() {
        return this.createEventForm.get('description');
    }

    get hours() {
        return this.createEventForm.get('hours');
    }

    get minutes() {
        return this.createEventForm.get('minutes');
    }

    get seconds() {
        return this.createEventForm.get('seconds');
    }

  createEvent(): void {

      this.errorMessage = true;


      console.log(this.timePicker.time);
      console.log('testing man');

      if (this.timePicker.time == null) {
          this.timePickerMessage = true;
      }

      if (!this.createEventForm.get('name').invalid && !this.createEventForm.get('date').invalid
      && !this.createEventForm.get('description').invalid && this.timePicker.time != null) {


         console.log(typeof(this.timePicker.time.hour));

         if (this.timePicker.time.hour < 10) {
            this.formatedHours = '0' + this.timePicker.time.hour;
         }

         if (this.timePicker.time.minute < 10) {
             this.formatedMinutes = '0' + this.timePicker.time.minute;
         }

         console.log(typeof(this.formatedHours));
         console.log(this.formatedHours);


        this.eventDateTime = this.createEventForm.get('date').value.year + '-' + this.createEventForm.get('date').value.month + '-' +
            this.createEventForm.get('date').value.day + 'T' + this.formatedHours + ':' +
            this.formatedMinutes + ':00.855Z';


        console.log(this.timePicker.time.hour);
        console.log(this.timePicker.time.minute);
        console.log(this.eventDateTime);


          this.event = {
              name: this.createEventForm.get('name').value,
              description: this.createEventForm.get('description').value,
              eventDate: this.eventDateTime,
              eventGroupId: 4,
              memberId: 25
          };



          const observable = this.eventService.createEvent(this.event);

          observable.subscribe();

          if (observable != null) {
              alert('The event is successfully created.');
              this.router.navigate(['/event']);
          }
      }

  }
}
