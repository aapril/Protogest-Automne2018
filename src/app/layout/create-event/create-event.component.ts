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

  createEvent(nameEvent: string, descriptionEvent: string, year: string, month: string, day: string,
              groupId: string, taskId: string, authorId: string, stateId: string): void {
     console.log(nameEvent);
    console.log(descriptionEvent);
      console.log('asbed 2');
      console.log(year + month + day);

      let date: string;
      date = year + '-' + month + '-' + day + 'T18:18:48.855Z'
      console.log(date);

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
      let observable = this.eventService.createEvent(this.event);

      observable.subscribe();
  }
}
