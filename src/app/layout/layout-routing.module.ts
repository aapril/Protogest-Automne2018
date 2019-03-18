import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'schedule', pathMatch: 'prefix' },
            { path: '/', redirectTo: 'schedule', pathMatch: 'prefix' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },            
            { path: 'calendar', loadChildren: './calendar/calendar.module#CalendarModule' },
            { path: 'schedule', loadChildren: './schedule/schedule.module#ScheduleModule' },
            { path: 'event', loadChildren: './events/event.module#EventModule' },
            { path: 'event/:id/tasks', loadChildren: './tasks/tasks.module#TasksModule' },
            { path: 'create-event', loadChildren: './create-event/create-event.module#CreateEventModule'},
            { path: 'create-protocol', loadChildren: './create-protocol/create-protocol.module#CreateProtocolModule'}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
