import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TimepickerBasicComponent } from './timepicker-basic.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
      NgbModule,
      FormsModule
  ],
  declarations: [TimepickerBasicComponent]
})
export class TimepickerBasicModule { }
