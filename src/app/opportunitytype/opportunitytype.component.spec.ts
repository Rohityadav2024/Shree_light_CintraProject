import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunitytypeComponent } from './opportunitytype.component';

describe('OpportunitytypeComponent', () => {
  let component: OpportunitytypeComponent;
  let fixture: ComponentFixture<OpportunitytypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpportunitytypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunitytypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
