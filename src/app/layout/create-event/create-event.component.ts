import { Component, OnInit } from '@angular/core';
import {Event, EventService} from '../events/event.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

    event: Event;
    events: Event[];

  constructor(private eventService: EventService) { }

  ngOnInit() {

  }

  createEvent(nameEvent: string, descriptionEvent: string, date: string,
              groupId: string, taskId: string, authorId: string, stateId: string): void {
     console.log(nameEvent);
    console.log(descriptionEvent);
      console.log('asbed 2');

      this.event = {
          id: 0,
          name: nameEvent,
          description: descriptionEvent,
          eventDate: new Date(date),
          eventGroupId: 1,
          taskId: 2,
          authorId: 1,
          eventStateId: 1
      }
      console.log(nameEvent);
      this.eventService.createEvent(this.event).subscribe(event => this.events.push(event));
  }
}
