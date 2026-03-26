import { TestBed } from '@angular/core/testing';

import { Goaltrackerservice } from './goaltrackerservice';

describe('Goaltrackerservice', () => {
  let service: Goaltrackerservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Goaltrackerservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
