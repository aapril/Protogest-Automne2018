import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TaskService } from '../../../shared/services/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
  taskFormGroup: FormGroup
  @Input() taskGroupId: number
  constructor(private ts: TaskService) {
    this.taskFormGroup = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      eventDate: new FormControl('')
    })
  }

  ngOnInit() {
    console.log(this.taskGroupId)
  }

}
