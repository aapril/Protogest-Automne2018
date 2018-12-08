import { Component, OnInit, Input } from '@angular/core';
import { Task, TaskService } from '../../../shared/services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() taskGroupId: number
  tasks: Task[]
  create: boolean = false

  constructor(private ts: TaskService) { }

  ngOnInit() {
    console.log(this.taskGroupId)
    this.getTasks()
  }

  getTasks() {
    this.ts.getTasksFromGroup(this.taskGroupId).subscribe(t => { 
      this.tasks = t
    })
  }

  createTask() {
    this.create = !this.create
  }

}
