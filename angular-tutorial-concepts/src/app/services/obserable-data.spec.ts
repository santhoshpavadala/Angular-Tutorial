import { TestBed } from '@angular/core/testing';

import { ObserableData } from './obserable-data';

describe('ObserableData', () => {
  let service: ObserableData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObserableData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
