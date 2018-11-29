import { EventFilterPipe } from './event.pipe';

describe('EventPipe', () => {
  it('create an instance', () => {
    const pipe = new EventFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
