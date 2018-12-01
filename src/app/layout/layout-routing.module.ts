import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },            
            { path: 'scheduler', loadChildren: './scheduler/scheduler.module#SchedulerModule' },
            { path: 'event', loadChildren: './events/event.module#EventModule' },
            { path: 'event/:id/tasks', loadChildren: './tasks/tasks.module#TasksModule' },
            { path: 'create-event', loadChildren: './create-event/create-event.module#CreateEventModule'}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
