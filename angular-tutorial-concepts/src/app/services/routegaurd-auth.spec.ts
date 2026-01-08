import { TestBed } from '@angular/core/testing';

import { RoutegaurdAuth } from './routegaurd-auth';

describe('RoutegaurdAuth', () => {
  let service: RoutegaurdAuth;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutegaurdAuth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
