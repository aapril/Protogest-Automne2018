import {Component, ViewChild} from '@angular/core';
import {DayPilotSchedulerComponent} from "daypilot-pro-angular";
import {SchedulerService} from "./scheduler.service";
import { routerTransition } from '../../router.animations';

@Component({
  selector: 'scheduler-component',
  styleUrls: ['./scheduler.component.scss'],
  templateUrl: '/scheduler.component.html',
  animations: [routerTransition()]

})
export class SchedulerComponent {

  constructor(private ds: SchedulerService) {}
  
  @ViewChild("scheduler1")
  scheduler: DayPilotSchedulerComponent;

  events: any;

  config: any = {
    timeHeaders : [
      {groupBy: "Month", format: "MMMM yyyy"},
      {groupBy: "Day", format: "d"}
    ],
    days: 30,
    startDate: "2018-11-01",
    scale: "Day"
  };

}