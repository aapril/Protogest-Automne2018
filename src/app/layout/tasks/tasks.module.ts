import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksRoutingModule } from './tasks-routing.module';
import { PageHeaderModule } from '../../shared';
import { TasksComponent } from './tasks.component';
import { TaskService } from '../../shared/services/task.service';
import { TaskComponent } from './task/task.component';
import { CreateTaskComponent } from './create-task/create-task.component'

@NgModule({
  imports: [
    CommonModule,
    TasksRoutingModule,
    PageHeaderModule
  ],
  declarations: [TasksComponent, TaskComponent, CreateTaskComponent],
  providers: [TaskService]
})
export class TasksModule { }
