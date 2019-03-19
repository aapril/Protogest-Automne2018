import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProtocolService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Gets all the events
   * Returns: List of Event objects
   */
  getUserProtocols(): Observable<Event[]> {
    return this.httpClient.get<Event[]>(environment.eventApiUrl + "/eventGroup/all").pipe(catchError((error:any) => {
      return throwError(error.statusText);
    }));
  }

  /** POST: add a new event to the database */

  createProtocol (payload) {
    var localUser = localStorage.getItem('CognitoIdentityServiceProvider.'+environment.poolData.ClientId+'.LastAuthUser');
    var localSecretKey = 'CognitoIdentityServiceProvider.'+environment.poolData.ClientId+'.'+localUser+'.accessToken';

    httpOptions.headers.append(
      'Authentification', localStorage.getItem(localSecretKey)
    );

    return this.httpClient.post(environment.backendUrl + '/my/protocols', payload, httpOptions)
      .pipe(
        catchError((error: any) => {
          return throwError(error.statusText);
        })
    );
  }
}
