import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksRoutingModule } from './tasks-routing.module';
import { PageHeaderModule } from '../../shared';
import { TasksComponent } from './tasks.component';

@NgModule({
  imports: [
    CommonModule,
    TasksRoutingModule,
    PageHeaderModule
  ],
  declarations: [TasksComponent]
})
export class TasksModule { }
