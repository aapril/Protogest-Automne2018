import { CreateEventModule } from './create-event.module';

describe('CreateEventModule', () => {
  let createEventModule: CreateEventModule;

  beforeEach(() => {
    createEventModule = new CreateEventModule();
  });

  it('should create an instance', () => {
    expect(createEventModule).toBeTruthy();
  });
});
