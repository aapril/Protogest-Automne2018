import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';

import { ListProtocolRoutingModule } from './list-protocol-routing.module';
import { ListProtocolComponent } from './list-protocol.component';
import { MatStepperModule, MatInputModule, MatButtonModule, MatAutocompleteModule } from '@angular/material';
import { CreateEventModule } from '../create-event/create-event.module';
import { ScheduleModule } from '../schedule/schedule.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ListProtocolRoutingModule,
        MatStepperModule,
        MatInputModule,
        MatButtonModule,
        MatAutocompleteModule,
        MatRadioModule,
        ScheduleModule,
        CreateEventModule,
        ScheduleModule,
        TranslateModule,
        NgbModule
    ],
    declarations: [ListProtocolComponent],
})
export class ListProtocolModule { }
