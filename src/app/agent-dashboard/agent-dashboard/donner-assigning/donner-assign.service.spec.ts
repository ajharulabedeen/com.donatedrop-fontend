import { TestBed } from '@angular/core/testing';

import { DonnerAssignService } from './donner-assign.service';

describe('DonnerAssignService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DonnerAssignService = TestBed.get(DonnerAssignService);
    expect(service).toBeTruthy();
  });
});
