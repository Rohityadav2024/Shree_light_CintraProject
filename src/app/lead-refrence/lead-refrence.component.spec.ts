import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadRefrenceComponent } from './lead-refrence.component';

describe('LeadRefrenceComponent', () => {
  let component: LeadRefrenceComponent;
  let fixture: ComponentFixture<LeadRefrenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadRefrenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadRefrenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
