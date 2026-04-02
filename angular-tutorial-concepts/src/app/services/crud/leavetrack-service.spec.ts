import { TestBed } from '@angular/core/testing';

import { LeavetrackService } from './leavetrack-service';

describe('LeavetrackService', () => {
  let service: LeavetrackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeavetrackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
