import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { EventService } from './event.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  calendarOptions: Options;
  displayEvent: any;
  events = null;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  constructor(protected eventService: EventService) { }

  ngOnInit() {
    this.loadevents();

    this.calendarOptions = {
      editable: true,
      eventLimit: false,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      events: this.events,
      displayEventTime: true,
      allDayText: 'All day',
      allDayDefault: true,
      timeFormat: 'H:mm',
      selectable: true,
      eventTextColor: 'white',
      eventRender: (v,el) => {console.log(v, el)}
    };
  }
  loadevents() {
    this.eventService.getEvents().subscribe(data => {
      this.events = data;
    });
  }
  clickButton(model: any) {
    this.displayEvent = model;
  }
  dayClick(model: any) {
    let el = {
      title: 'New event',
      start: model.date._d.toISOString()
    };
    this.events.push(el);
    this.ucCalendar.fullCalendar('renderEvent', el);
    this.ucCalendar.fullCalendar('rerenderEvents');
  }
  eventClick(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title,
        allDay: model.event.allDay
        // other params
      },
      duration: {}
    }
    this.displayEvent = model;
  }
  updateEvent(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title
        // other params
      },
      duration: {
        _data: model.duration._data
      }
    }
    this.displayEvent = model;
  }
  eventRender(model) {
    // const html = `<h6 class="blue-test">`+model.event.title+`</h6>`;
    const html = `<div class="card-color-inherit">
                        <div class="card-body" style="padding: 0.50rem;">
                            <h6 class="card-subtitle">`+model.event.title+`</h6>
                            <p class="card-text text-right"><b>`+model.event.protocol_event_id+`</b></p>
                        </div>
                    </div>
                </div>`;
    model.element.html(html)
  }

  start(){
      console.log('k');
  }
}
