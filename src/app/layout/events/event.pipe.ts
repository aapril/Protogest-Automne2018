import { Pipe, PipeTransform } from '@angular/core';
import { Event } from './event.service';

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
    if(name == "" || !name) return events
    name = name.toLowerCase();
    return events.filter(event => event.name.includes(name))
  }
}
