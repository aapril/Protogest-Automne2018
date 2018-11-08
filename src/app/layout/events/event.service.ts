import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Event {
  id: number
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
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
    return this.httpClient.get<Event[]>(environment.apiUrl + "/event-service/eventGroup/all").pipe(catchError((error:any) => {
      return Observable.throw(error.statusText);
    }));
  }

  getEventsGroup(group: string): Observable<Event[]> {
    return this.httpClient.get<Event[]>(environment.apiUrl + "/event-service/eventGroup/all").pipe(catchError((error:any) => {
      return Observable.throw(error.statusText);
    }));
  }

  getUserEvents(): Observable<Event[]> {
    return this.httpClient.get<Event[]>(environment.apiUrl + "/event-service/events/user").pipe(catchError((error:any) => {
      return Observable.throw(error.statusText);
    }));
  }

  /** POST: add a new event to the database */
  createEvent (event: Event): Observable<Event> {
    return this.httpClient.post<Event>(environment.apiUrl + "/event-service/event", event, httpOptions)
      .pipe(
        catchError((error:any) => {
          return Observable.throw(error.statusText);
        })
      );
  }

  /** PUT: update an event information */
  updateEvent (event: Event): Observable<Event> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');

    return this.httpClient.put<Event>(environment.apiUrl + "/event-service/event/" + event.id, event, httpOptions)
      .pipe(
        catchError((error:any) => {
          return Observable.throw(error.statusText);
        })
      );
  }

  /** DELETE: delete an event */
  deleteEvent(id: number) {
    const url = `${environment.apiUrl}/${id}`;
    return this.httpClient.delete(url, httpOptions)
      .pipe(
        catchError((error:any) => {
          return Observable.throw(error.statusText);
        })
      );
  }
}
