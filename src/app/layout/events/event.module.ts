import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { EventComponent } from './event.component';
import { PageHeaderModule } from './../../shared';

@NgModule({
    imports: [CommonModule, EventRoutingModule, PageHeaderModule],
    declarations: [EventComponent]
})
export class EventModule { }
