import {HttpClient} from "@angular/common/http";
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {DayPilot} from 'daypilot-pro-angular';

@Injectable()
export class SchedulerService {

  constructor(private http : HttpClient){
  }

}