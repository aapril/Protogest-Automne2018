import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksRoutingModule } from './tasks-routing.module';
import { PageHeaderModule } from '../../shared';
import { TasksComponent } from './tasks.component';
import { TaskService } from '../../shared/services/task.service'

@NgModule({
  imports: [
    CommonModule,
    TasksRoutingModule,
    PageHeaderModule
  ],
  declarations: [TasksComponent],
  providers: [TaskService]
})
export class TasksModule { }
