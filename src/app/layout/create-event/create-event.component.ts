import {Component, OnInit, ViewChild} from '@angular/core';
import {Event, EventService} from '../../shared/services/event.service';
import { CreateEvent } from './create-event';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { TimepickerBasicComponent } from '../../timepicker-basic/timepicker-basic.component';


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
        description: new FormControl('', Validators.required)
        });

    errorMessage: boolean;
    timePickerMessage: boolean;

    eventDateTime: string;


    formatedMonth: string;
    formatedDay: string;
    formatedHours: string;
    formatedMinutes: string;

  constructor(private eventService: EventService, private router: Router) { }

  ngOnInit() {

  }



  createEvent(): void {

      this.errorMessage = true;



      if (typeof(this.createEventForm.get('date').value) !== 'object') {
          alert('The date is invalid.');
      }


      if (this.timePicker.time == null) {
          this.timePickerMessage = true;
      }

      if (!this.createEventForm.get('name').invalid && !this.createEventForm.get('date').invalid
      && !this.createEventForm.get('description').invalid && this.timePicker.time != null &&
      this.timePicker.time.hour < 24 && this.timePicker.time.minute < 60 && typeof(this.createEventForm.get('date').value) === 'object') {



         if (this.timePicker.time.hour < 10) {
            this.formatedHours = '0' + this.timePicker.time.hour;
         } else {
             this.formatedHours = '' + this.timePicker.time.hour;
         }

         if (this.timePicker.time.minute < 10) {
             this.formatedMinutes = '0' + this.timePicker.time.minute;
         } else {
             this.formatedMinutes = '' + this.timePicker.time.minute;
         }

         if (this.createEventForm.get('date').value.month < 10) {
            this.formatedMonth = '0' + this.createEventForm.get('date').value.month;
         } else {
             this.formatedMonth = this.createEventForm.get('date').value.month;
         }

          if (this.createEventForm.get('date').value.day < 10) {
              this.formatedDay = '0' + this.createEventForm.get('date').value.day;
          } else {
              this.formatedDay = this.createEventForm.get('date').value.day;
          }




        this.eventDateTime = this.createEventForm.get('date').value.year + '-' + this.formatedMonth + '-' +
            this.formatedDay + 'T' + this.formatedHours + ':' +
            this.formatedMinutes + ':00.855Z';





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
