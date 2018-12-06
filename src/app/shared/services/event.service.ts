import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CreateEvent} from '../../layout/create-event/create-event';


export interface Event {
  id: number,
  name: string,
  description: string,
  eventDate: Date,
  eventGroupId: number,
  taskGroupId: number,
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
    return this.httpClient.get<Event[]>(environment.eventApiUrl + "/eventGroup/all").pipe(catchError((error:any) => {
      return throwError(error.statusText);
    }));
  }



  getEventsGroup(group: string): Observable<Event[]> {
    return this.httpClient.get<Event[]>(environment.eventApiUrl + "/eventGroup/all").pipe(catchError((error:any) => {
      return throwError(error.statusText);
    }));
  }




  getUserEvents(): Observable<Event[]> {
    return this.httpClient.get<Event[]>(environment.eventApiUrl + "/event/mine").pipe(catchError((error:any) => {
      return throwError(error.statusText);
    }));
  }

  /** POST: add a new event to the database */

  createEvent (event: Event): Observable<Event> {
    return this.httpClient.post<Event>(environment.eventApiUrl + "/event", event, httpOptions)
      .pipe(
        catchError((error: any) => {
          return throwError(error.statusText);
        })
      );
  }

    /** POST: add a new event to the database */

    createEvent2 (event: CreateEvent): Observable<CreateEvent> {
        return this.httpClient.post<CreateEvent>(environment.eventApiUrl + "/event", event, httpOptions)
            .pipe(
                catchError((error: any) => {
                    return throwError(error.statusText);
                })
            );
    }

  /** PUT: update an event information */
  updateEvent (event: Event): Observable<Event> {
    return this.httpClient.put<Event>(environment.eventApiUrl + "/event/" + event.id, event, httpOptions)
      .pipe(
        catchError((error:any) => {
          return throwError(error.statusText);
        })
      );
  }

  /** DELETE: delete an event */
  deleteEvent(id: number) {
    const url = `${environment.eventApiUrl}/event/${id}`;
    return this.httpClient.delete(url, httpOptions)
      .pipe(
        catchError((error:any) => {
          return throwError(error.statusText);
        })
      );
  }
}
