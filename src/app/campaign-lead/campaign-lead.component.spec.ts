import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignLeadComponent } from './campaign-lead.component';

describe('CampaignLeadComponent', () => {
  let component: CampaignLeadComponent;
  let fixture: ComponentFixture<CampaignLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignLeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
