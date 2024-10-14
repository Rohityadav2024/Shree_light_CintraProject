import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadEventComponent } from './lead-event.component';

describe('LeadEventComponent', () => {
  let component: LeadEventComponent;
  let fixture: ComponentFixture<LeadEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
