import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksComponent } from './tasks.component';
import { TaskComponent } from './task/task.component';

const routes: Routes = [
  { 
      path: '',
      component: TasksComponent
  },
  { path: ':id', component: TaskComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
