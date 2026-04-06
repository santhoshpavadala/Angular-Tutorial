import { TestBed } from '@angular/core/testing';

import { EmployeeOnboardService } from './employee-onboard-service';

describe('EmployeeOnboardService', () => {
  let service: EmployeeOnboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeOnboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
