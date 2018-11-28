import { Component, OnInit } from '@angular/core';
import {Event, EventService} from '../events/event.service';
import { CreateEvent } from './create-event';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

//    event: Event;
 //   events: Event[];
    event: CreateEvent;
    time: String;

  constructor(private eventService: EventService) { }

  ngOnInit() {

  }

  createEvent(nameEvent: string, descriptionEvent: string, date: string,
              eventGroup: string, member: string): void {
     console.log(nameEvent);
    console.log(descriptionEvent);




//      date = year + '-' + month + '-' + day + 'T18:18:48.855Z'
 

      this.event = {
          name: nameEvent,
          description: descriptionEvent,
          eventDate: date,
          eventGroupId: 1,
          memberId: 1
      }
      console.log(nameEvent);
      let observable = this.eventService.createEvent(this.event);

      observable.subscribe();
  }
}
