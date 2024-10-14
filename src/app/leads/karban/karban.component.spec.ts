import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KarbanComponent } from './karban.component';

describe('KarbanComponent', () => {
  let component: KarbanComponent;
  let fixture: ComponentFixture<KarbanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KarbanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KarbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
