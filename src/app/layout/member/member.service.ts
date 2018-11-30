import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Member} from './member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private httpClient: HttpClient) { }

    getAllMembers(): Observable<Member[]> {
        return this.httpClient.get<Member[]>('http://localhost:52175/member/all');
    }
}
