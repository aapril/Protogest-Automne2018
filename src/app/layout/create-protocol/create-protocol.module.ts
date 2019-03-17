import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material';

import { CreateProtocolRoutingModule } from './create-protocol-routing.module';
import { CreateProtocolComponent } from './create-protocol.component';
import { MatStepperModule, MatInputModule, MatButtonModule, MatAutocompleteModule } from '@angular/material';
import { CreateEventModule } from '../create-event/create-event.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CreateProtocolRoutingModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatRadioModule,
    CreateEventModule
  ],
  declarations: [CreateProtocolComponent],
})
export class CreateProtocolModule { }
