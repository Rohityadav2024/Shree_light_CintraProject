import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetAssignedDetailsComponent } from './target-assigned-details.component';

describe('TargetAssignedDetailsComponent', () => {
  let component: TargetAssignedDetailsComponent;
  let fixture: ComponentFixture<TargetAssignedDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TargetAssignedDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetAssignedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
