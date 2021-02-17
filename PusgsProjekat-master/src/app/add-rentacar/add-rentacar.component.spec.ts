import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddRentacarComponent } from './add-rentacar.component';

describe('AddRentacarComponent', () => {
  let component: AddRentacarComponent;
  let fixture: ComponentFixture<AddRentacarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRentacarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRentacarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
