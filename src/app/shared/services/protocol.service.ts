import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


const headersDict = {
  'Content-Type':  'application/json',
  'Access-Control-Allow-Origin': '*'
};

@Injectable({
  providedIn: 'root'
})
export class ProtocolService {

  constructor(private httpClient: HttpClient) { }

  getSecretKey(): String {
    var localUser = localStorage.getItem('CognitoIdentityServiceProvider.'+environment.poolData.ClientId+'.LastAuthUser');
    return localStorage.getItem('CognitoIdentityServiceProvider.'+environment.poolData.ClientId+'.'+localUser+'.accessToken');
  }

  /**
   * Gets all the events
   * Returns: List of Event objects
   */j
  getUserProtocols(): Observable<Event[]> {
    var localSecretKey = this.getSecretKey();

    let allHeaders = Object.assign({}, headersDict, {'Authentification': localSecretKey});

    const httpOptions = {
      headers: new HttpHeaders(allHeaders)
    };

    return this.httpClient.get<Event[]>(environment.backendUrl + '/my/protocols',httpOptions).pipe(catchError((error:any) => {
      return throwError(error.statusText);
    }));
  }

   getUserRelatedProtocols(): Observable<Event[]> {
    var localSecretKey = this.getSecretKey();

    let allHeaders = Object.assign({}, headersDict, {'Authentification': localSecretKey});

    const httpOptions = {
      headers: new HttpHeaders(allHeaders)
    };

    return this.httpClient.get<Event[]>(environment.backendUrl + '/my/related-protocols',httpOptions).pipe(catchError((error:any) => {
      return throwError(error.statusText);
    }));
  }

  getProtocolByUUID(uuid): Observable<Event[]> {
    var localSecretKey = this.getSecretKey();

    let allHeaders = Object.assign({}, {'Access-Control-Allow-Origin': '*'}, {'Authentification': localSecretKey});

    const httpOptions = {
      headers: new HttpHeaders(allHeaders)
    };

    return this.httpClient.get<Event[]>(environment.backendUrl + '/my/protocols/' + uuid, httpOptions).pipe(catchError((error:any) => {
      return throwError(error.statusText);
    }));
  }

  /** POST: add a new event to the database */

  createProtocol (payload) {
    var localSecretKey = this.getSecretKey();

    let allHeaders = Object.assign({}, headersDict, {'Authentification': localSecretKey});

    const httpOptions = {
      headers: new HttpHeaders(allHeaders)
    };

    return this.httpClient.post(environment.backendUrl + '/my/protocols', payload, httpOptions)
      .pipe(
        catchError((error: any) => {
          return throwError(error.statusText);
        })
    );
  }

  updateProtocol (payload,uuid) {
    var localSecretKey = this.getSecretKey();

    let allHeaders = Object.assign({}, headersDict, {'Authentification': localSecretKey,'formUUID': uuid});

    const httpOptions = {
      headers: new HttpHeaders(allHeaders)
    };

    return this.httpClient.put(environment.backendUrl + '/my/protocols/' + uuid, payload, httpOptions)
      .pipe(
        catchError((error: any) => {
          return throwError(error.statusText);
        })
    );
  }
}
