import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCompaignsetComponent } from './edit-compaignset.component';

describe('EditCompaignsetComponent', () => {
  let component: EditCompaignsetComponent;
  let fixture: ComponentFixture<EditCompaignsetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCompaignsetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCompaignsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
