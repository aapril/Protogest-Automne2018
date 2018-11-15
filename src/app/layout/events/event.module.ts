import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { EventComponent } from './event.component';
import { PageHeaderModule } from './../../shared';
import { EventFilterPipe } from './event.pipe';

@NgModule({
    imports: [CommonModule, EventRoutingModule, PageHeaderModule],
    declarations: [EventComponent, EventFilterPipe]
})
export class EventModule { }
