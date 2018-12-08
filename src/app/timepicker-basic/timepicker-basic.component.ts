import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timepicker-basic',
  templateUrl: './timepicker-basic.component.html',
  styleUrls: ['./timepicker-basic.component.scss']
})
export class TimepickerBasicComponent implements OnInit {
    time = {hour: 13, minute: 30};
  constructor() { }

  ngOnInit() {
  }

}
