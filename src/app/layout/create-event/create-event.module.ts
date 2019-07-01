import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CreateEventRootingModule } from './create-event-rooting.module';
import { MatStepperModule, MatInputModule, MatButtonModule, MatAutocompleteModule } from '@angular/material';
import { CreateEventComponent } from './create-event.component';
import { PageHeaderModule } from './../../shared';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    CreateEventRootingModule,
    PageHeaderModule,
    NgbModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule
  ],
  declarations: [CreateEventComponent],
  exports: [CreateEventComponent]
})
export class CreateEventModule {}
