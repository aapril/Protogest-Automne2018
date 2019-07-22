import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule, MatRadioModule} from '@angular/material';

import { CreateTemplateModule } from '../create-template/create-template.module'
import { CreateProtocolRoutingModule } from './create-protocol-routing.module';
import { CreateProtocolComponent } from './create-protocol.component';
import { MatStepperModule, MatInputModule, MatButtonModule, MatAutocompleteModule } from '@angular/material';
import { CreateEventModule } from '../create-event/create-event.module';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CreateProtocolRoutingModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    MatRadioModule,
    CreateEventModule,
    CreateTemplateModule,
    TranslateModule
  ],
  declarations: [CreateProtocolComponent],
})
export class CreateProtocolModule { }
