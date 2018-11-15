import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { EventComponent } from './event.component';
import { PageHeaderModule } from './../../shared';
import { EventFilterPipe } from './event.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    imports: [CommonModule, EventRoutingModule, PageHeaderModule, FormsModule, ReactiveFormsModule, NgbModule],
    declarations: [EventComponent, EventFilterPipe]
})
export class EventModule { }
