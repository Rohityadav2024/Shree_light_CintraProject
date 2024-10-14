import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetAssignedComponent } from './target-assigned.component';

describe('TargetAssignedComponent', () => {
  let component: TargetAssignedComponent;
  let fixture: ComponentFixture<TargetAssignedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TargetAssignedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetAssignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
