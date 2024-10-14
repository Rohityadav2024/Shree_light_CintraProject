import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTargetAssignedDetailsComponent } from './single-target-assigned-details.component';

describe('SingleTargetAssignedDetailsComponent', () => {
  let component: SingleTargetAssignedDetailsComponent;
  let fixture: ComponentFixture<SingleTargetAssignedDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleTargetAssignedDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleTargetAssignedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
