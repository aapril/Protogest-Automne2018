import { DatepickerPopupRoutingModule } from './datepicker-popup-routing.module';

describe('DatepickerPopupRoutingModule', () => {
  let datepickerPopupRoutingModule: DatepickerPopupRoutingModule;

  beforeEach(() => {
    datepickerPopupRoutingModule = new DatepickerPopupRoutingModule();
  });

  it('should create an instance', () => {
    expect(datepickerPopupRoutingModule).toBeTruthy();
  });
});
