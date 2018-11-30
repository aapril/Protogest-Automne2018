import { Component, OnInit } from '@angular/core';
import {Event, EventService} from '../events/event.service';
import { CreateEvent } from './create-event';
import { EventGroup} from './event-group';
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
    eventGroups: EventGroup[];
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

  constructor(private eventService: EventService, private memberService: MemberService) { }

  ngOnInit() {

  }

  getAllEventGroups(): void {
      console.log('you made into');
/*      this.eventGroupObs = this.eventService.getAllEventGroups();
      console.log(this.eventGroupObs);
     this.eventGroups =  this.eventGroupObs.subscribe();*/
        this.eventService.getAllEventGroups().subscribe(groupevent => {console.log(groupevent);
        this.eventGroups = groupevent;
        for (const i of this.eventGroups) {
            if (i.name === this.eventGroupString) {
                this.eventGroupId = i.id;
            }

        }
            console.log('eventGroupID: ' + this.eventGroupId);
        this.eventGroupRequest = true;
            this.executeRequest();
        });

  }

  getAllMembers(): void {
      this.memberService.getAllMembers().subscribe(member => {console.log(member);
        this.members = member;
        for (const i of this.members) {
            if (i.firstName === this.memberFirstName) {
                this.memberId = i.id;
            }

        }

           console.log('memberID: ' + this.memberId);
           this.memberRequest = true;
          this.executeRequest();
      });
  }

  executeRequest(): void {
      if (this.memberRequest === true && this.eventGroupRequest === true) {
          this.event = {
              name: this.eventName,
              description: this.eventDescription,
              eventDate: this.eventDate,
              eventGroupId: this.eventGroupId,
              memberId: this.memberId
          };

          const observable = this.eventService.createEvent(this.event);

          observable.subscribe();
      }
  }

  createEvent(nameEvent: string, descriptionEvent: string, date: string,
              eventGroup: string, member: string): void {

      this.eventGroupRequest = false;
      this.memberRequest = false;

      this.eventGroupString = eventGroup;
      this.memberFirstName = member;
      this.eventName = nameEvent;
      this.eventDescription = descriptionEvent;
      this.eventDate = date;

    this.getAllEventGroups();
    this.getAllMembers();

//      date = year + '-' + month + '-' + day + 'T18:18:48.855Z'

/*
        this.event = {
            name: nameEvent,
            description: descriptionEvent,
            eventDate: date,
            eventGroupId: this.eventGroupId,
            memberId: this.memberId
        };

        const observable = this.eventService.createEvent(this.event);

        observable.subscribe();
*/


  }
}
