import {Component, ViewChild, AfterViewInit} from "@angular/core";
import {DayPilot, DayPilotCalendarComponent, DayPilotNavigatorComponent} from "daypilot-pro-angular";
import {CalendarService} from "./calendar.service";
import { routerTransition } from '../../router.animations';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  animations: [routerTransition()]
})
export class CalendarComponent implements AfterViewInit {

  @ViewChild("navigator") navigator: DayPilotNavigatorComponent;
  @ViewChild("calendar") calendar: DayPilotCalendarComponent;

  expanded: boolean = true;

  navigatorConfig: any = {
    showMonths: 3,
    skipMonths: 3,
    selectMode: "week",
    cellWidth: 30,
    cellHeight: 30,
    dayHeaderHeight: 30,
    titleHeight: 30
  };

  events: any[] = [];

  config: any = {
    startDate: "2018-07-01",
    viewType: "Week",
    heightSpec: "Parent100Pct",
    cellHeight: 30,
    headerHeight: 30,
    hourWidth: 60,
    onTimeRangeSelected: function (args) {
      DayPilot.Modal.prompt("Create a new event:", "Event 1").then(function(modal) {
        var dp = args.control;
        dp.clearSelection();
        if (!modal.result) { return; }
        dp.events.add(new DayPilot.Event({
          start: args.start,
          end: args.end,
          id: DayPilot.guid(),
          text: modal.result
        }));
      });
    }
  };

  constructor(private ds: CalendarService) {
  }

  ngAfterViewInit(): void {
  }

  viewChange(): void {

    var from = this.calendar.control.visibleStart();
    var to = this.calendar.control.visibleEnd();

    this.ds.getEvents(from, to).subscribe(result => {
      this.events = result;
    });
  }

  ngOnInit() {}

}