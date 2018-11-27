import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateEventRootingModule } from './create-event-rooting.module';
import { CreateEventComponent } from './create-event.component';
import { PageHeaderModule } from './../../shared';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    imports: [CommonModule, CreateEventRootingModule, PageHeaderModule, NgbModule],
  declarations: [CreateEventComponent]
})
export class CreateEventModule { }
