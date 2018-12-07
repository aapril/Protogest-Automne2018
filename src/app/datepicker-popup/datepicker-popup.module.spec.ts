import { DatepickerPopupModule } from './datepicker-popup.module';

describe('DatepickerPopupModule', () => {
  let datepickerPopupModule: DatepickerPopupModule;

  beforeEach(() => {
    datepickerPopupModule = new DatepickerPopupModule();
  });

  it('should create an instance', () => {
    expect(datepickerPopupModule).toBeTruthy();
  });
});
