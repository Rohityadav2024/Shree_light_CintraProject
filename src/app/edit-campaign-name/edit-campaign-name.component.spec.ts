import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCampaignNameComponent } from './edit-campaign-name.component';

describe('EditCampaignNameComponent', () => {
  let component: EditCampaignNameComponent;
  let fixture: ComponentFixture<EditCampaignNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCampaignNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCampaignNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
