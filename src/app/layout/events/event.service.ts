import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CreateEvent} from '../create-event/create-event';
import { EventGroup} from '../create-event/event-group';

export interface Event {
  id: number,
  name: string,
  description: string,
  eventDate: Date,
  eventGroupId: number,
  taskId: number,
  authorId: number,
  eventStateId: number
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Gets all the events
   * Returns: List of Event objects
   */
  getEvents(): Observable<Event[]> {
    return this.httpClient.get<Event[]>(environment.apiUrl + "/eventGroup/all").pipe(catchError((error:any) => {
      return throwError(error.statusText);
    }));
  }

  getEventsGroup(group): Observable<Event[]> {
      console.log('true');
    return this.httpClient.get<Event[]>(environment.apiUrl + "/eventGroup/all").pipe(catchError((error:any) => {
      return throwError(error.statusText);
    }));
  }


  getAllEventGroups(): Observable<EventGroup[]> {
      return this.httpClient.get<EventGroup[]>("http://localhost:52172/eventGroup/all");
  }

  getUserEvents(): Observable<Event[]> {
    return this.httpClient.get<Event[]>(environment.apiUrl + "/event/mine").pipe(catchError((error:any) => {
      return throwError(error.statusText);
    }));
  }

  /** POST: add a new event to the database */
  createEvent (event: CreateEvent): Observable<CreateEvent> {

      console.log(event);
      return this.httpClient.post<CreateEvent>("http://localhost:52172/event", event, httpOptions);
/*    return this.httpClient.post<Event>(environment.apiUrl + "/event", event, httpOptions)
      .pipe(
        catchError((error: any) => {
          return throwError(error.statusText);
        })
      ); */
  }

  /** PUT: update an event information */
  updateEvent (event: Event): Observable<Event> {
    return this.httpClient.put<Event>(environment.apiUrl + "/event/" + event.id, event, httpOptions)
      .pipe(
        catchError((error:any) => {
          return throwError(error.statusText);
        })
      );
  }

  /** DELETE: delete an event */
  deleteEvent(id: number) {
    const url = `${environment.apiUrl}/event/${id}`;
    return this.httpClient.delete(url, httpOptions)
      .pipe(
        catchError((error:any) => {
          return throwError(error.statusText);
        })
      );
  }
}
