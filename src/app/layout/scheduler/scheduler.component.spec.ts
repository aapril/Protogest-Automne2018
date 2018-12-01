import { async, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'

import { SchedulerComponent } from './scheduler.component'
import { SchedulerModule } from './scheduler.module'

describe('SchedulerComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ SchedulerModule, RouterTestingModule ],
    })
    .compileComponents()
  }))

  it('should create', () => {
    const fixture = TestBed.createComponent(SchedulerComponent)
    const component = fixture.componentInstance
    expect(component).toBeTruthy()
  })
})
