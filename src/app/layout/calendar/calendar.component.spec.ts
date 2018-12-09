import { async, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'

import { CalendarComponent } from './calendar.component'
import { CalendarModule } from './calendar.module'

describe('CalendarComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CalendarModule, RouterTestingModule ],
    })
    .compileComponents()
  }))

  it('should create', () => {
    const fixture = TestBed.createComponent(CalendarComponent)
    const component = fixture.componentInstance
    expect(component).toBeTruthy()
  })
})
