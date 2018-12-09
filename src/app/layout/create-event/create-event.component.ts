import {Component, OnInit } from '@angular/core';
import { EventService } from '../../shared/services/event.service';
import { CreateEvent } from './create-event';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';



import {Router} from '@angular/router';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {


    event: CreateEvent;

    createEventForm = new FormGroup({
        name: new FormControl('', Validators.required),
        date: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        time: new FormControl('', Validators.required)
        });

    errorMessage: boolean;

    time = {hour: 13, minute: 30};

    eventDateTime: Date;



  constructor(private eventService: EventService, private router: Router) { }

  ngOnInit() {

  }



  createEvent(): void {

      this.errorMessage = true;



      if (!this.createEventForm.get('name').invalid && !this.createEventForm.get('date').invalid
      && !this.createEventForm.get('description').invalid && !this.createEventForm.get('time').invalid &&
      typeof(this.createEventForm.get('date').value) === 'object') {




        this.eventDateTime = new Date(this.createEventForm.get('date').value.year,
            this.createEventForm.get('date').value.month - 1,
            this.createEventForm.get('date').value.day,
            this.createEventForm.get('time').value.hour,
            this.createEventForm.get('time').value.minute);



          this.event = {
              name: this.createEventForm.get('name').value,
              description: this.createEventForm.get('description').value,
              eventDate: this.eventDateTime,
              eventGroupId: 4,
              memberId: 25
          };



          const observable = this.eventService.createEvent(this.event);

          observable.subscribe(event => {

              alert('The event is successfully created.');
              this.router.navigate(['/event']);
          });

      }

  }
}
