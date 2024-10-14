import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeMilanComponent } from './employee-milan.component';

describe('EmployeeMilanComponent', () => {
  let component: EmployeeMilanComponent;
  let fixture: ComponentFixture<EmployeeMilanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeMilanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeMilanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
