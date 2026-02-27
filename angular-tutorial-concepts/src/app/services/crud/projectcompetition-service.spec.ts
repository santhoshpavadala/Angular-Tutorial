import { TestBed } from '@angular/core/testing';

import { ProjectcompetitionService } from './projectcompetition-service';

describe('ProjectcompetitionService', () => {
  let service: ProjectcompetitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectcompetitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
