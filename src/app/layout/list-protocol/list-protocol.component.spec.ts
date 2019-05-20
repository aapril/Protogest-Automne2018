import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProtocolComponent } from './list-protocol.component';
import {LayoutModule} from '../layout.module';
import {RouterTestingModule} from '@angular/router/testing';

describe('ListProtocolComponent', () => {
  let component: ListProtocolComponent;
  let fixture: ComponentFixture<ListProtocolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProtocolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProtocolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
