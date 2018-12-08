import { TimepickerBasicModule } from './timepicker-basic.module';

describe('TimepickerBasicModule', () => {
  let timepickerBasicModule: TimepickerBasicModule;

  beforeEach(() => {
    timepickerBasicModule = new TimepickerBasicModule();
  });

  it('should create an instance', () => {
    expect(timepickerBasicModule).toBeTruthy();
  });
});
