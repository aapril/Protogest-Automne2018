import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CreateEventRootingModule } from './create-event-rooting.module';
import { CreateEventComponent } from './create-event.component';
import { PageHeaderModule } from './../../shared';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';


@NgModule({
    imports: [CommonModule, CreateEventRootingModule, PageHeaderModule, NgbModule, ReactiveFormsModule, FormsModule],
  declarations: [CreateEventComponent],
  exports: [CreateEventComponent]
})
export class CreateEventModule { }
