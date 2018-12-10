import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import { Member } from './member';
import {catchError} from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class MemberService {

//    private createMemberUrl = 'http://localhost:52175/member';

  constructor(private http: HttpClient) { }

  createMember(member: Member): Observable<Member> {

    return this.http.post<Member>(environment.memberApiUrl + '/member', member, httpOptions).pipe(catchError((error: any) => {
        return throwError(error.statusText);
    }));
  }

}
