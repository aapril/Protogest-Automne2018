import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateEventRootingModule } from './create-event-rooting.module';
import { CreateEventComponent } from './create-event.component';
import { PageHeaderModule } from './../../shared';


@NgModule({
    imports: [CommonModule, CreateEventRootingModule, PageHeaderModule],
  declarations: [CreateEventComponent]
})
export class CreateEventModule { }
