import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FullCalendarModule } from 'ng-fullcalendar';
import { CommonModule } from '@angular/common';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleComponent } from './schedule.component';
import { EventService } from './event.service';

@NgModule({
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    FormsModule,
    FullCalendarModule
  ],
  declarations: [ScheduleComponent],
  providers: [ EventService ]
})
export class ScheduleModule { }
