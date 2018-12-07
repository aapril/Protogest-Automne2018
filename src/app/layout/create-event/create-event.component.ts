import { Component, OnInit } from '@angular/core';
import {Event, EventService} from '../../shared/services/event.service';
import { CreateEvent } from './create-event';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { MemberService } from '../member/member.service';
import { Member } from '../member/member';

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
        });



  constructor(private eventService: EventService) { }

  ngOnInit() {

  }


  createEvent(): void {


        this.event = {
            name: this.createEventForm.get('name').value,
            description: this.createEventForm.get('description').value,
            eventDate: '2018-11-11T18:18:48.855Z',
            eventGroupId: 4,
            memberId: 25
        };

        console.log(this.event);

        const observable = this.eventService.createEvent2(this.event);

        observable.subscribe();


  }
}
