import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CreateEventRootingModule } from './create-event-rooting.module';
import { CreateEventComponent } from './create-event.component';
import { DatepickerPopupComponent } from '../../datepicker-popup/datepicker-popup.component';
import { TimepickerBasicComponent } from '../../timepicker-basic/timepicker-basic.component';
import { PageHeaderModule } from './../../shared';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';


@NgModule({
    imports: [CommonModule, CreateEventRootingModule, PageHeaderModule, NgbModule, ReactiveFormsModule, FormsModule],
  declarations: [CreateEventComponent, DatepickerPopupComponent, TimepickerBasicComponent]
})
export class CreateEventModule { }
