import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsMapDashboard } from './rxjs-map-dashboard';

describe('RxjsMapDashboard', () => {
  let component: RxjsMapDashboard;
  let fixture: ComponentFixture<RxjsMapDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsMapDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RxjsMapDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
