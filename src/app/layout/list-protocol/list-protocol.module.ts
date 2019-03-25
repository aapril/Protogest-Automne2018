import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material';

import { ListProtocolRoutingModule } from './list-protocol-routing.module';
import { ListProtocolComponent } from './list-protocol.component';
import { MatStepperModule, MatInputModule, MatButtonModule, MatAutocompleteModule } from '@angular/material';
import { CreateEventModule } from '../create-event/create-event.module';
import { ScheduleModule } from '../schedule/schedule.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ListProtocolRoutingModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatRadioModule,
    ScheduleModule,
    CreateEventModule,
    ScheduleModule
  ],
  declarations: [ListProtocolComponent],
})
export class ListProtocolModule { }
