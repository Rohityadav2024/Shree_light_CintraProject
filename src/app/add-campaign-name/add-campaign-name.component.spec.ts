import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCampaignNameComponent } from './add-campaign-name.component';

describe('AddCampaignNameComponent', () => {
  let component: AddCampaignNameComponent;
  let fixture: ComponentFixture<AddCampaignNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCampaignNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCampaignNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
