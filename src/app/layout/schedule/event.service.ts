import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {  } from 'rxjs';
@Injectable()
export class EventService {
    public getEvents(): Observable<any> {
        const dateObj = new Date();
        const yearMonth = dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
        let data: any = [{
            protocol_event_id: 1,
            title: 'All Day Event',
            start: yearMonth + '-01',
            allDay: true,
            color: '#FF6859',
        },
        {
            protocol_event_id: 12,
            title: 'Long Event',
            start: yearMonth + '-07',
            end: yearMonth + '-12',
            allDay: true,
            color: '#1EB980'
        },
        {
            protocol_event_id: 23,
            title: 'Conference',
            start: yearMonth + '-12',
            allDay: true,
            color: '#FFCF44',
        },
        {
            protocol_event_id: 34,
            title: 'Click for Google',
            start: yearMonth + '-28',
            allDay: true,
            color: '#B15DFF',
        }];
        return of(data);
    }
}