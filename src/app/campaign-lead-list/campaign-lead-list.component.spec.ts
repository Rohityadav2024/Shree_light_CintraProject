import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignLeadListComponent } from './campaign-lead-list.component';

describe('CampaignLeadListComponent', () => {
  let component: CampaignLeadListComponent;
  let fixture: ComponentFixture<CampaignLeadListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignLeadListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignLeadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
