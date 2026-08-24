import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashboardModule } from './user-dashboard-module';

describe('UserDashboardModule', () => {
  let component: UserDashboardModule;
  let fixture: ComponentFixture<UserDashboardModule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDashboardModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDashboardModule);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
