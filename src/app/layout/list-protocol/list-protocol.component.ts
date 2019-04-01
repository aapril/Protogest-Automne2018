import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CreateEventComponent } from '../create-event/create-event.component';
import { ScheduleComponent } from '../schedule/schedule.component'
import { ProtocolService } from '../../shared/services/protocol.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-list-protocol',
  templateUrl: './list-protocol.component.html',
  styleUrls: ['./list-protocol.component.scss'],
  providers: [CreateEventComponent,ScheduleComponent]
})
export class ListProtocolComponent implements OnInit {
   userProtocol = [];
   userRelatedProtocol = [];
   afficherList  = true;
   afficherProtocol = false;
   afficherCalendar = false;

   constructor(private protocolService: ProtocolService,protected http: HttpClient,private createEvent: CreateEventComponent ,private scheduleComponent: ScheduleComponent) {}
   
  ngOnInit() {

    this.protocolService.getUserProtocols().subscribe(
        data => {
           this.userProtocol = data;
        }
      );

      this.protocolService.getUserRelatedProtocols().subscribe(
        data => {
           this.userRelatedProtocol = data;
        }
      );
  }

  showProtocolCalendar(data) {
    localStorage.setItem('protocolCalendar', JSON.stringify(data.fields));
    this.afficherList = false;
    this.afficherCalendar = true;
    this.scheduleComponent.start(data.fields);
  }
  updateProtocol(data){
    this.afficherList = false;
    this.afficherProtocol = true;
    this.createEvent.setData(data.fields)
  }  

    
}
