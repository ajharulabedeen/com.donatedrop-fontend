import { TestBed } from '@angular/core/testing';

import { DonationHistoryService } from './donation-history.service';

describe('DonationHistoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DonationHistoryService = TestBed.get(DonationHistoryService);
    expect(service).toBeTruthy();
  });
});
