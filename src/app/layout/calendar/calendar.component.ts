import {Component, ViewChild, OnInit, AfterViewInit} from '@angular/core';
import {DayPilot, DayPilotCalendarComponent, DayPilotNavigatorComponent} from "daypilot-pro-angular";
import { routerTransition } from '../../router.animations';
import { EventService, Event } from '../../shared/services/event.service'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  animations: [routerTransition()]
})
export class CalendarComponent implements OnInit {
  @ViewChild("calendar") calendar : DayPilotCalendarComponent;
  events: Event[]
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

  calendarEvents: any[] = []


  constructor(private es: EventService) {  }

  ngOnInit(): void {
    this.getUserEvents()
  }

  getUserEvents() {
    this.es.getUserEvents().subscribe(events => { 
      this.events = events
      this.events.forEach(e => {
        this.calendarEvents.push({
          id: e.id,
          start: new Date(e.eventDate),
          end: new Date(e.eventDate),
          resource: "R1",
          text: e.name
        })
      })
    })
  }

}