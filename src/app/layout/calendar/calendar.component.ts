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

  calendarConfig = {
    locale: "en-ca",
    timeHeaders: [
      {
        "groupBy": "Day"
      },
      {
        "groupBy": "Hour"
      }
    ],
    scale: "Hour",
    days: DayPilot.Date.today().daysInMonth(),
    startDate: DayPilot.Date.today().firstDayOfMonth(),
    businessWeekends: true,
    eventHeight: 30,
    timeRangeSelectedHandling: "Disabled",
    eventMoveHandling: "Disabled",
    eventResizeHandling: "Disabled",
    eventDeleteHandling: "Disabled",
    eventClickHandling: "Select",
    onEventEdited: function (args) {
      this.message("Event selected: " + args.e.text());
    },
    eventHoverHandling: "Bubble",
    bubble: new DayPilot.Bubble({
      onLoad: function(args) {
        // if event object doesn't specify "bubbleHtml" property 
        // this onLoad handler will be called to provide the bubble HTML
        args.html = "Event details";
      }
    }),
    resources: [
      {
        "name": "Event",
        "id": "R1"
      }
    ]
  };

  events: any[] = [
    { id: 1, start: "2018-12-09", end: "2018-12-12", resource: "R1", text: "Event 1" }
  ]


  constructor(private ds: CalendarService) {  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    //this.ds.getEvents(this.calendar.control.visibleStart(), this.calendar.control.visibleEnd()).subscribe(result => this.events = result);
  }

}