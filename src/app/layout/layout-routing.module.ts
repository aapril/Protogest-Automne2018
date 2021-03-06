import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'list-protocol', pathMatch: 'prefix' },
            { path: '/', redirectTo: 'list-protocol', pathMatch: 'prefix' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },            
            { path: 'calendar', loadChildren: './calendar/calendar.module#CalendarModule' },
            { path: 'schedule', loadChildren: './schedule/schedule.module#ScheduleModule' },
            { path: 'event', loadChildren: './events/event.module#EventModule' },
            { path: 'event/:id/tasks', loadChildren: './tasks/tasks.module#TasksModule' },
            { path: 'create-event', loadChildren: './create-event/create-event.module#CreateEventModule'},
            { path: 'create-protocol', loadChildren: './create-protocol/create-protocol.module#CreateProtocolModule'},
            { path: 'list-protocol', loadChildren: './list-protocol/list-protocol.module#ListProtocolModule'},
            { path: 'profil', loadChildren: './profil/profil.module#ProfilModule'}

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
