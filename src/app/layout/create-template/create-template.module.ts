import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material';

import { CreateTemplateRoutingModule } from './create-template-routing.module';
import { CreateTemplateComponent } from './create-template.component';
import { MatSidenavModule, MatInputModule } from '@angular/material';
import { CreateEventModule } from '../create-event/create-event.module';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CreateTemplateRoutingModule,
    MatRadioModule,
    MatSidenavModule,
    MatInputModule,
    MatRadioModule,
    CreateEventModule,
    TranslateModule
  ],
  declarations: [CreateTemplateComponent],
})
export class CreateTemplateModule { }
