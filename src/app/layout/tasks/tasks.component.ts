import { Component, OnInit } from '@angular/core';
import { Task, TaskGroup, TaskService } from '../../shared/services/task.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  eventId: number
  taskGroups: TaskGroup[]
  tasks: Task[]
  taskView: boolean = false
  constructor(private taskService: TaskService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.eventId = this.route.snapshot.params['id']
    this.getTaskGroups()
  }

  getTaskGroups() {
    this.taskService.getTaskGroups(this.eventId).subscribe(t => { 
      this.taskGroups = t; 
      console.log(this.taskGroups) 
    })
  }

  getTasks(taskGroupId: number) {
    this.taskService.getTasksFromGroup(taskGroupId).subscribe(t => {
      this.tasks = t
    })
  }

}
