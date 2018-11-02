import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Event } from '../../services/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  providers: [ EventService ]
})
export class EventComponent implements OnInit {
  events: Event[];
  event: Event;
  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.getEvents();
  }

  getEvents(): void {
    this.eventService.getEvents().subscribe(events => this.events = events)
  }
  
  getEventGroup(group: string): void {
    if (group) {
      this.eventService.getEventsGroup(group)
        .subscribe(events => this.events = events);
    }
    this.eventService.getEvents().subscribe(event => this.events = event)
  }

  updateEvent() {
    if (this.event) {
      this.eventService.updateEvent(this.event)
        .subscribe(event => {
          //logic to do
        });
      this.event = undefined;
    }
  }

  createEvent(event: Event) {
    if (event){
      this.eventService.createEvent(event)
        .subscribe(event => this.events.push(event));
    }
  }

  getUserEvents() {
    this.eventService.getEvents().subscribe(events => this.events = events)
  }

}
