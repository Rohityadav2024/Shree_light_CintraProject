import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadCampaignFollowupComponent } from './lead-campaign-followup.component';

describe('LeadCampaignFollowupComponent', () => {
  let component: LeadCampaignFollowupComponent;
  let fixture: ComponentFixture<LeadCampaignFollowupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadCampaignFollowupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadCampaignFollowupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
