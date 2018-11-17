import { Component, OnInit } from '@angular/core';
import { EventService } from './event.service';
import { Event } from './event.service';
import { routerTransition } from '../../router.animations';
import { FormGroup, FormControl } from '@angular/forms'

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  providers: [ EventService ],
  animations: [routerTransition()]
})
export class EventComponent implements OnInit { 
  eventFormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    eventDate: new FormControl(''),
  })
  searchFormGroup = new FormGroup({
    searchValue: new FormControl('')
  })
  currentFilter: number;
  search: string;
  events: Event[];
  event: Event;
  filterType;
  editView: boolean = false;
  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.getEvents();
    this.filterType = {pending: 'Pending', completed: 'Completed', deleted: 'Deleted', none: 'All'};
    this.currentFilter = 0;
  }

  getEvents(): void {
    //this.eventService.getUserEvents().subscribe(events => this.events = events)
    this.events = [
      {
        id: 0,
        name: "Event1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        eventDate: new Date("2018-11-15T17:13:44.855Z"),
        eventGroupId: 1,
        taskId: 1,
        authorId: 1,
        eventStateId: 1
      },
      {
        id: 1,
        name: "Event2",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        eventDate: new Date("2018-11-15T17:13:44.855Z"),
        eventGroupId: 1,
        taskId: 2,
        authorId: 1,
        eventStateId: 1
      },
      {
        id: 2,
        name: "Event3",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        eventDate: new Date("2018-11-15T17:13:44.855Z"),
        eventGroupId: 1,
        taskId: 2,
        authorId: 1,
        eventStateId: 1
      },
      {
        id: 3,
        name: "Event4",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        eventDate: new Date("2018-11-15T17:13:44.855Z"),
        eventGroupId: 1,
        taskId: 3,
        authorId: 1,
        eventStateId: 2
      },
      {
        id: 4,
        name: "Event5",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        eventDate: new Date("2018-11-15T17:13:44.855Z"),
        eventGroupId: 1,
        taskId: 3,
        authorId: 1,
        eventStateId: 3
      },
      {
        id: 5,
        name: "Event6",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        eventDate: new Date("2018-11-15T17:13:44.855Z"),
        eventGroupId: 1,
        taskId: 3,
        authorId: 1,
        eventStateId: 1
      },
      {
        id: 6,
        name: "Event7",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        eventDate: new Date("2018-11-15T17:13:44.855Z"),
        eventGroupId: 1,
        taskId: 3,
        authorId: 1,
        eventStateId: 1
      },
      {
        id: 7,
        name: "Event8",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        eventDate: new Date("2018-11-15T17:13:44.855Z"),
        eventGroupId: 1,
        taskId: 3,
        authorId: 1,
        eventStateId: 1
      },
      {
        id: 8,
        name: "Event9",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        eventDate: new Date("2018-11-15T17:13:44.855Z"),
        eventGroupId: 1,
        taskId: 3,
        authorId: 1,
        eventStateId: 1
      },
      {
        id: 9,
        name: "Event10",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        eventDate: new Date("2018-11-15T17:13:44.855Z"),
        eventGroupId: 1,
        taskId: 3,
        authorId: 1,
        eventStateId: 1
      }
    ]
  }

  filterEvents(filter: string){
    switch (filter){
      case this.filterType['none']:
        this.currentFilter = 0;
        break;
      case this.filterType['pending']:
        this.currentFilter = 1;
        break;
      case this.filterType['completed']:
        this.currentFilter = 2;
        break;
      case this.filterType['deleted']:
        this.currentFilter = 3;
        break;
      default:
        this.currentFilter = 0;
    }
  }
  
  getEventGroup(group: string): void {
    if (group) {
      this.eventService.getEventsGroup(group)
        .subscribe(events => this.events = events);
    }
    this.eventService.getEvents().subscribe(event => this.events = event)
  }

  updateEvent() {
    this.event.name = this.eventFormGroup.value.name;
    this.event.description = this.eventFormGroup.value.description;
    this.event.eventDate = new Date(this.eventFormGroup.value.eventDate)
    this.editView = false;
    // if (this.event) {
    //   this.eventService.updateEvent(this.event)
    //     .subscribe(event => {
    //       //logic to do
    //     });
    //   this.event = undefined;
    // }
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

  editEvent(event: Event){
    this.event = event;
    this.editView = true;
  }
  
  cancelEdit() {
    this.editView = false;
  }

  deleteEvent(event: Event) {
    // console.log(event.name)
    event.eventStateId = 3;
    // this.events = this.eventFilterPipe.transform(this.events, this.currentFilter);
    //this.events = this.events.filter(e => e !== event);
    //this.eventService.deleteEvent(event.id).subscribe();
  }

  searchEvent() {
    this.search = this.searchFormGroup.value.searchValue;
  }
}
