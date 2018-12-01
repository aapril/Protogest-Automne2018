import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import { User } from './user';
import {catchError} from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private userSignUpUrl = 'http://localhost:52177/user/signUp';

  constructor(private http: HttpClient) {}

/*  getUsers (): Observable<User[]> {

     let users = this.http.get<User[]>(this.userSignUpUrl);
     if (!users) {
         return new Observable<User[]>();
     }
     return users;
  }*/

  createUser(user: User): Observable<User> {

      console.log(user);
      return this.http.post<User>(this.userSignUpUrl, user, httpOptions);
  }
}
