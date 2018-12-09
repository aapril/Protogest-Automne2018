import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { PageHeaderModule } from './../../shared';

import {CalendarService} from "./calendar.service";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {DayPilotModule} from "daypilot-pro-angular";
import {HttpClientModule} from "@angular/common/http";
//import {SidebarModule} from "../sidebar/sidebar.module";

@NgModule({
    imports: [
      DayPilotModule, 
      BrowserModule,
      FormsModule,
      HttpClientModule, 
      CommonModule, 
      CalendarRoutingModule, 
      PageHeaderModule
      //SidebarModule
    ],
    declarations: [CalendarComponent],
    
    exports:      [ CalendarComponent ],
    providers:    [ CalendarService ]
})
export class CalendarModule {}



