import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProtocolComponent } from './create-protocol.component';

describe('CreateProtocolComponent', () => {
  let component: CreateProtocolComponent;
  let fixture: ComponentFixture<CreateProtocolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProtocolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProtocolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
