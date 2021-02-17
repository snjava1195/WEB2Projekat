import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReserveFlightComponent } from './reserve-flight.component';

describe('ReserveFlightComponent', () => {
  let component: ReserveFlightComponent;
  let fixture: ComponentFixture<ReserveFlightComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReserveFlightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
