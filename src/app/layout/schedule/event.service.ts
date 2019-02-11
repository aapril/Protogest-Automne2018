import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {  } from 'rxjs';
@Injectable()
export class EventService {
    public getEvents(): Observable<any> {
        const dateObj = new Date();
        const yearMonth = dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
        let data: any = [{
            title: 'All Day Event',
            start: yearMonth + '-01',
            color: '#FF6859',
        },
        {
            title: 'Long Event',
            start: yearMonth + '-07',
            end: yearMonth + '-12',
            allDay: true,
            color: '#1EB980'
        },
        {
            title: 'Conference',
            start: yearMonth + '-12',
            allDay: false,
            color: '#FFCF44',
        },
        {
            title: 'Click for Google',
            url: 'http://google.com/',
            start: yearMonth + '-28',
            color: '#B15DFF',
        }];
        return of(data);
    }
}