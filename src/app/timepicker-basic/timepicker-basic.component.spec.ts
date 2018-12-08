import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimepickerBasicComponent } from './timepicker-basic.component';

describe('TimepickerBasicComponent', () => {
  let component: TimepickerBasicComponent;
  let fixture: ComponentFixture<TimepickerBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimepickerBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimepickerBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
