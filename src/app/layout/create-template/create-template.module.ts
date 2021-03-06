import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CreateTemplateRoutingModule } from './create-template-routing.module';
import { CreateTemplateComponent } from './create-template.component';
import { MatSidenavModule, MatInputModule, MatRadioModule, MatCheckboxModule, MatButtonModule } from '@angular/material';
import { CreateEventModule } from '../create-event/create-event.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CreateTemplateRoutingModule,
    MatRadioModule,
    MatSidenavModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule,
    CreateEventModule,
    TranslateModule
  ],
  declarations: [CreateTemplateComponent],
  exports: [CreateTemplateComponent]
})
export class CreateTemplateModule { }
