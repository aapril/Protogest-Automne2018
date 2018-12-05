import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class LoginService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<LoginService>(environment.userApiUrl + "/user/signin", { username: username, password: password })
            .pipe(map(user => {
                if (user) {                               
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            }));
    }
    
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}