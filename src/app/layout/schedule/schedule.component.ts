import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { EventService } from './event.service';
import { ProtocolService } from '../../shared/services/protocol.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  protocoleId: String;
  calendarOptions: Options;
  displayEvent: any;
  protocol: any = {};
  schema: any = [];
  events: any = [];
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  constructor(private protocolService: ProtocolService, private http: HttpClient, protected eventService: EventService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params)=> {
      if(params['id']){
        this.protocoleId = params['id'];
        this.loadevents();
      } else {
        this.events = [];
        this.loadCalendar();
      }
    });
  }

  loadCalendar() {
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

  getEventDescriptionFromSchema(id) {
    for (let section of this.schema.protocolFields) {
      for(let subSection of section.subSection) {
        if(subSection.num === id) {
          return subSection.desc;
        } else {
          for(let dateSection of subSection.dateSection){
            if(dateSection.num === id){
              return dateSection.desc;
            }
          }
        }
      }
    }
  }

  loadevents() {
    this.protocolService.getUserProtocols().subscribe(
      data => {
        this.http.get(environment.backendUrl + "/protocol-schemas")
          .subscribe((schemas: Object[]) => {
            this.protocol = data.filter(protocol => protocol['uuid'] === this.protocoleId)[0];
            // Get schema associated with protocol
            this.schema = schemas.find(schema => schema['uuid'] === this.protocol.protocolUuid);
            this.protocol.fields.filter(event => event.type === "DATE").forEach(event => {
              var splitted = event.value.split("-");
              var year = splitted[0];
              var month = splitted[1];
              var day = splitted[2];
              if(month.length == 1){
              month = "0" + month;
              } 
              if(day.length == 1){
              day = "0" + day;
              } 
              this.events.push({
                  protocol_event_id: event.id,
                  title: this.getEventDescriptionFromSchema(event.id),
                  start: year + "-" + month + "-" + day,
                  allDay: true,
                  color: '#6E7BC4'
              }) 
            });
            this.loadCalendar();
          })
      }
    );
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
}
