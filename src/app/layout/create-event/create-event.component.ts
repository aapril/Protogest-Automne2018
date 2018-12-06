import { Component, OnInit } from '@angular/core';
import {Event, EventService} from '../../shared/services/event.service';
import { CreateEvent } from './create-event';

import { Observable } from 'rxjs';
import { MemberService } from '../member/member.service';
import { Member } from '../member/member';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

//    event: Event;
 //   events: Event[];
    event: CreateEvent;

    eventGroupId: number;
    eventGroupRequest: boolean;
    members: Member[];

    memberId: number;
    memberRequest: boolean;


    eventGroupString: string;
    memberFirstName: string;
    eventName: string;
    eventDescription: string;
    eventDate: string;

  constructor(private eventService: EventService) { }

  ngOnInit() {

  }




  createEvent(nameEvent: string, descriptionEvent: string, date: string,
              eventGroup: string, member: string): void {



      this.eventGroupString = eventGroup;
      this.memberFirstName = member;
      this.eventName = nameEvent;
      this.eventDescription = descriptionEvent;
      this.eventDate = date;



//      date = year + '-' + month + '-' + day + 'T18:18:48.855Z'

        this.event = {
            name: nameEvent,
            description: descriptionEvent,
            eventDate: date,
            eventGroupId: 4,
            memberId: 25
        };

        const observable = this.eventService.createEvent2(this.event);

        observable.subscribe();


  }
}
