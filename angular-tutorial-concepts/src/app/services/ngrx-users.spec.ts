import { TestBed } from '@angular/core/testing';

import { NgrxUsers } from './ngrx-users';

describe('NgrxUsers', () => {
  let service: NgrxUsers;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgrxUsers);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
