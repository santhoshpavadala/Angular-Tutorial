import { TestBed } from '@angular/core/testing';

import { CrudReactiveService } from './crud-reactive-service';

describe('CrudReactiveService', () => {
  let service: CrudReactiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudReactiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
