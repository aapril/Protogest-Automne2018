import { Pipe, PipeTransform } from '@angular/core';
import { Event } from './event.service';

@Pipe({
  name: 'eventFilter'
})
export class EventFilterPipe implements PipeTransform {
  transform(events: Event[], currentFilter: number) {
    console.log(currentFilter)
    return (currentFilter == 0) ? events : events.filter(event => event.eventStateId == currentFilter);
  }
}
