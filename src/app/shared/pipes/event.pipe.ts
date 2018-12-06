import { Pipe, PipeTransform } from '@angular/core';
import { Event } from '../services/event.service';

@Pipe({
  name: 'eventFilter'
})
export class EventFilterPipe implements PipeTransform {
  transform(events: Event[], currentFilter: number) {
    return (currentFilter == 0) ? events.filter(event => event.eventStateId != 3) : events.filter(event => event.eventStateId == currentFilter);
  }
}

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {
  transform(events: Event[], name: string) {
    if(name == "" || !name || name.length < 1) return events
    name = name.toLowerCase();
    return events.filter(event => new RegExp(name, 'g').test(event.name.toLowerCase()))
  }
}
