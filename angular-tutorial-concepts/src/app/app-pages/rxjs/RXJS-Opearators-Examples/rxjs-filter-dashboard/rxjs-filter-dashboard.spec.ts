import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsFilterDashboard } from './rxjs-filter-dashboard';

describe('RxjsFilterDashboard', () => {
  let component: RxjsFilterDashboard;
  let fixture: ComponentFixture<RxjsFilterDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsFilterDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RxjsFilterDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
