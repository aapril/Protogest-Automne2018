import { Component, OnInit } from '@angular/core';
import { EventService } from '../../shared/services/event.service';
import { Event } from '../../shared/services/event.service';
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
  eventFormGroup: FormGroup 
  searchFormGroup = new FormGroup({
    searchValue: new FormControl('')
  })
  currentFilter: number;
  search: string;
  events: Event[];
  event: Event;
  filterType;
  editView: boolean = false;
  constructor(private eventService: EventService) {
    this.eventFormGroup = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      eventDate: new FormControl('')
    })
  }

  ngOnInit() {
    this.getEvents();
    this.filterType = {pending: 'Pending', completed: 'Completed', deleted: 'Deleted', none: 'All'};
    this.currentFilter = 0;
  }

  getEvents(): void {
    this.eventService.getUserEvents().subscribe(events => this.events = events)
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
    this.eventFormGroup.patchValue({
      name: this.event.name,
      description: this.event.description,
      eventDate: this.event.eventDate
   });
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
    this.eventService.deleteEvent(event.id).subscribe();
  }

  searchEvent() {
    this.search = this.searchFormGroup.value.searchValue;
  }

  updateEvent() {
    this.event.name = this.eventFormGroup.value.name;
    this.event.description = this.eventFormGroup.value.description;
    if(this.eventFormGroup.value.eventDate.year != null && this.eventFormGroup.value.eventDate.month != null  && this.eventFormGroup.value.eventDate.day != null)
      this.event.eventDate = new Date(this.eventFormGroup.value.eventDate.year, this.eventFormGroup.value.eventDate.month - 1, this.eventFormGroup.value.eventDate.day)
    else
      this.event.eventDate = this.eventFormGroup.value.eventDate
    console.log(this.event.eventDate)
    console.log(this.event)
    if (this.event) {
      this.eventService.updateEvent(this.event)
        .subscribe(event => {
          this.event = event
          this.editView = false
        });
    }
  }
}
