import {Component, ViewChild, OnInit, AfterViewInit} from '@angular/core';
import {DayPilot, DayPilotCalendarComponent, DayPilotNavigatorComponent} from "daypilot-pro-angular";
import {CalendarService} from "./calendar.service";
import { routerTransition } from '../../router.animations';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  animations: [routerTransition()]
})
export class CalendarComponent implements OnInit, AfterViewInit {
  @ViewChild("calendar") calendar : DayPilotCalendarComponent;

  events: any[];

  calendarConfig = {
    startDate: DayPilot.Date.today(),
    viewType: "Week"
  };

  constructor(private ds: CalendarService) {  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.ds.getEvents(this.calendar.control.visibleStart(), this.calendar.control.visibleEnd()).subscribe(result => this.events = result);
  }

}