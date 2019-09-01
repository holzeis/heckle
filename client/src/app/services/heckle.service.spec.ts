import { TestBed } from '@angular/core/testing';

import { HeckleService } from './heckle.service';

describe('HeckleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeckleService = TestBed.get(HeckleService);
    expect(service).toBeTruthy();
  });
});
