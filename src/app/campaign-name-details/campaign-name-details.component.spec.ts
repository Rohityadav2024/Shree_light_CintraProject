import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignNameDetailsComponent } from './campaign-name-details.component';

describe('CampaignNameDetailsComponent', () => {
  let component: CampaignNameDetailsComponent;
  let fixture: ComponentFixture<CampaignNameDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignNameDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignNameDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
