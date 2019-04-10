import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {  } from 'rxjs';
@Injectable()
export class EventService {
    public getEvents(protocol): Observable<any> {
        var data = [];
        protocol.fields.forEach(element => {
            var splitted = element.value.split("-");
            var year = splitted[0];
            var month = splitted[1];
            var day = splitted[2];
            if(month.length == 1){
             month = "0" + month;
            } 
            if(day.length == 1){
             day = "0" + day;
            } 
            data.push({
                protocol_event_id: element.id,
                title: 'All Day Event',
                start: year + "-" + month + "-" + day,
                allDay: true,
                color: '#6E7BC4'
            }) 
        }); 
        console.log(data);
        const dateObj = new Date();
        const yearMonth = dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
        return of(data);
    }
}