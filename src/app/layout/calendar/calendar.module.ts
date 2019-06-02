import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';

import {CalendarService} from './calendar.service';
import {FormsModule} from '@angular/forms';
import {DayPilotModule} from 'daypilot-pro-angular';
import {HttpClientModule} from '@angular/common/http';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
      DayPilotModule,
      FormsModule,
      HttpClientModule,
      CommonModule,
      CalendarRoutingModule,
      TranslateModule
    ],
    declarations: [CalendarComponent],

    exports:      [ CalendarComponent ],
    providers:    [ CalendarService ]
})
export class CalendarModule {}



