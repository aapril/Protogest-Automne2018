import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import { User } from './user';
import {catchError} from 'rxjs/operators';
import { environment } from '../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) {}

/*  getUsers (): Observable<User[]> {

     let users = this.http.get<User[]>(this.userSignUpUrl);
     if (!users) {
         return new Observable<User[]>();
     }
     return users;
  }*/

  createUser(user: User): Observable<User> {

      return this.http.post<User>(environment.userApiUrl + '/user/signUp', user, httpOptions).pipe(catchError((error: any) => {

          if (error.status === 422) {
              alert('Username is already in use');
          }
          return throwError(error.statusText);
      }));

  }
}
