import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Member } from './member';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MemberService {
    private createMemberUrl = 'localhost:52175/member';

  constructor(private http: HttpClient) { }

  createMember(member: Member): Observable<Member> {
    return this.http.post<Member>(this.createMemberUrl, member, httpOptions);
  }
}
