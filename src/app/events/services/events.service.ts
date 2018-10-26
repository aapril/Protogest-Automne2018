import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private httpClient: HttpClient) { }

  getEvents() {
    return this.httpClient.get(environment.apiUrl + "/event-service/events").pipe(catchError((error:any) => {
      return Observable.throw(error.statusText);
    }));
  }

  getEventsGroup(group: string) {
    return this.httpClient.get(environment.apiUrl + "/event-service/events/group")
  }

  getUserEvents() {
    return this.httpClient.get(environment.apiUrl + "/event-service/events/user")
  }

  createEvent() {
    
    return this.httpClient.post(environment.apiUrl + "/event-service/events", {})
  }
}
