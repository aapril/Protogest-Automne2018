import { Component, OnInit } from '@angular/core';
import {Event, EventService} from '../events/event.service';
import { CreateEvent } from './create-event';
import { EventGroup} from './event-group';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

//    event: Event;
 //   events: Event[];
    event: CreateEvent;
    eventGroups: EventGroup[];
    eventGroupString: string;
    eventGroupId: number;

  constructor(private eventService: EventService) { }

  ngOnInit() {

  }

  getAllEventGroups(): void {
      console.log('you made into');
/*      this.eventGroupObs = this.eventService.getAllEventGroups();
      console.log(this.eventGroupObs);
     this.eventGroups =  this.eventGroupObs.subscribe();*/
        this.eventService.getAllEventGroups().subscribe(groupevent => {console.log(groupevent);
        this.eventGroups = groupevent;
        for (let i of this.eventGroups) {
            if (i.name === this.eventGroupString) {
                this.eventGroupId = i.id;
            }
            console.log(this.eventGroupId + 'id');
        }
        });

  }

  createEvent(nameEvent: string, descriptionEvent: string, date: string,
              eventGroup: string, member: string): void {

      this.eventGroupString = eventGroup;

    this.getAllEventGroups();


//      date = year + '-' + month + '-' + day + 'T18:18:48.855Z'


      this.event = {
          name: nameEvent,
          description: descriptionEvent,
          eventDate: date,
          eventGroupId: 2,
          memberId: 26
      };

      const observable = this.eventService.createEvent(this.event);

      observable.subscribe();
  }
}
