import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class LoginService {
    private userSignInUrl = 'http://localhost:52177/user/signin';
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<any>(`userSignInUrl`, { username: username, password: password })
            .pipe(map(user => {
                if (user && user.token) {                    
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