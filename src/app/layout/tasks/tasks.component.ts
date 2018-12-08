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
  currentTaskGroupId: number
  constructor(private taskService: TaskService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.eventId = this.route.snapshot.params['id']
    this.getTaskGroups()
  }

  getTaskGroups() {
    this.taskService.getTaskGroupsFromEvent(this.eventId).subscribe(t => { 
      this.taskGroups = t; 
    })
  }

  getTasks(taskGroupId: number) {
    this.currentTaskGroupId = taskGroupId
    this.toggleTaskView()
  }

  toggleTaskView() {
    this.taskView = !this.taskView
  }
}
