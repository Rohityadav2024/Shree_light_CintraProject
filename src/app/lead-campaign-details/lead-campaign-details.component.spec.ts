import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadCampaignDetailsComponent } from './lead-campaign-details.component';

describe('LeadCampaignDetailsComponent', () => {
  let component: LeadCampaignDetailsComponent;
  let fixture: ComponentFixture<LeadCampaignDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadCampaignDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadCampaignDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
