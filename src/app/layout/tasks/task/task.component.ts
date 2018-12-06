import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../../shared/services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() tasks: Task[]

  constructor() { }

  ngOnInit() {
  }

}
