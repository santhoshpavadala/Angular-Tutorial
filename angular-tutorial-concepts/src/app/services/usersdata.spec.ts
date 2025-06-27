import { TestBed } from '@angular/core/testing';

import { Usersdata } from './usersdata';

describe('Usersdata', () => {
  let service: Usersdata;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Usersdata);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
