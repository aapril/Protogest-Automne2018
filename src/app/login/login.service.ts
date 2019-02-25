import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs/index';
import {Task, TaskGroup} from '../shared/services/task.service';


const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json',
    })
};

@Injectable()
export class LoginService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<any>(environment.userApiUrl + "/user/signIn", { username: username, password: password })
            .pipe(map(user => {
                if (user) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            }));
    }
    printEvents() {
        console.log(environment.eventApiUrl + '/events/list');
        return this.http.get<any>(environment.eventApiUrl + '/events/list', { headers: httpOptions.headers, params: {}}).pipe(catchError((error:any) => {
            return throwError(error.statusText);
        })).subscribe();
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
