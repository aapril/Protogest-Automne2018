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
     */
    getUserProtocols(): Observable<Event[]> {
        var localSecretKey = JSON.parse(localStorage.getItem("currentUser"))["ACCESS_TOKEN"];

        let allHeaders = Object.assign({}, headersDict, {'Authentification': localSecretKey});

        const httpOptions = {
            headers: new HttpHeaders(allHeaders)
        };

        return this.httpClient.get<Event[]>(environment.backendUrl + '/my/protocols',httpOptions).pipe(catchError((error:any) => {
            return throwError(error.statusText);
        }));
    }

    getUserRelatedProtocols(): Observable<Event[]> {
        var localSecretKey = JSON.parse(localStorage.getItem("currentUser"))["ACCESS_TOKEN"];

        let allHeaders = Object.assign({}, headersDict, {'Authentification': localSecretKey});

        const httpOptions = {
            headers: new HttpHeaders(allHeaders)
        };

        return this.httpClient.get<Event[]>(environment.backendUrl + '/my/related-protocols',httpOptions).pipe(catchError((error:any) => {
            return throwError(error.statusText);
        }));
    }

    getUserAttribute(): Observable<Event[]> {
        var localSecretKey = JSON.parse(localStorage.getItem("currentUser"))["ACCESS_TOKEN"];

        let allHeaders = Object.assign({}, headersDict, {'Authentification': localSecretKey});

        const httpOptions = {
            headers: new HttpHeaders(allHeaders)
        };

        return this.httpClient.get<Event[]>(environment.backendUrl + '/user/getAttribute', httpOptions).pipe(catchError((error: any) => {
            return throwError(error.statusText);
        }));
    }

    setUserAttribute(firstName, lastName): Observable<Event[]> {
        var localSecretKey = JSON.parse(localStorage.getItem("currentUser"))["ACCESS_TOKEN"];

        let allHeaders = Object.assign({}, headersDict, {'Authentification': localSecretKey});

        const httpOptions = {
            headers: new HttpHeaders(allHeaders)
        };
        console.log(environment.backendUrl + '/user/setAttribute/' + firstName + '/' + lastName);
        return this.httpClient.post<Event[]>(environment.backendUrl + '/user/setAttribute/', { firstName : firstName, lastName : lastName} , httpOptions).pipe(catchError((error: any) => {
            return throwError(error.statusText);
        }));
    }

    getProtocolByUUID(uuid): Observable<Event> {
        var localSecretKey = JSON.parse(localStorage.getItem("currentUser"))["ACCESS_TOKEN"];

        let allHeaders = Object.assign({}, headersDict, {'Authentification': localSecretKey});

        const httpOptions = {
            headers: new HttpHeaders(allHeaders)
        };

        return this.httpClient.get<Event>(environment.backendUrl + '/my/protocols/' + uuid, httpOptions).pipe(catchError((error:any) => {
            return throwError(error.statusText);
        }));
    }

    /** POST: add a new event to the database */

    createProtocol (payload) {
        var localSecretKey = JSON.parse(localStorage.getItem("currentUser"))["ACCESS_TOKEN"];

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

    resetPassword (): Observable<Event> {
        var localSecretKey = JSON.parse(localStorage.getItem("currentUser"))["ACCESS_TOKEN"];

        let allHeaders = Object.assign({}, headersDict, {'Authentification': localSecretKey});

        const httpOptions = {
            headers: new HttpHeaders(allHeaders)
        };

        return this.httpClient.get<Event>(environment.backendUrl + '/user/resetPass', httpOptions).pipe(catchError((error: any) => {
            return throwError(error.statusText);
        }));
    }

    changePassword (oldPassword, newPassword): Observable<Event[]> {
        var localSecretKey = JSON.parse(localStorage.getItem("currentUser"))["ACCESS_TOKEN"];

        let allHeaders = Object.assign({}, headersDict, {'Authentification': localSecretKey});

        const httpOptions = {
            headers: new HttpHeaders(allHeaders)
        };

        return this.httpClient.post<Event[]>(environment.backendUrl + '/user/changePassword/', { oldPassword : oldPassword, newPassword : newPassword} , httpOptions).pipe(catchError((error: any) => {
            return throwError(error.statusText);
        }));
    }

    forgotPassword (userName): Observable<Event[]> {

        return this.httpClient.post<Event[]>(environment.backendUrl + '/user/forgotPassword/', { userName : userName} ).pipe(catchError((error: any) => {
            return throwError(error.statusText);
        }));
    }

    confirmPassword (userName, password, code): Observable<Event[]> {

        return this.httpClient.post<Event[]>(environment.backendUrl + '/user/resetPasswordCode/', { userName : userName, password : password, code : code} ).pipe(catchError((error: any) => {
            return throwError(error.statusText);
        }));
    }
}
