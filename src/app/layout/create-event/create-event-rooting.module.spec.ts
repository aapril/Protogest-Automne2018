import { CreateEventRootingModule } from './create-event-rooting.module';

describe('CreateEventRootingModule', () => {
  let createEventRootingModule: CreateEventRootingModule;

  beforeEach(() => {
    createEventRootingModule = new CreateEventRootingModule();
  });

  it('should create an instance', () => {
    expect(createEventRootingModule).toBeTruthy();
  });
});
