import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DatepickerPopupComponent } from './datepicker-popup.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
      NgbModule,
      FormsModule
  ],
  declarations: [DatepickerPopupComponent]
})
export class DatepickerPopupModule { }
