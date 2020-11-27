import { TestBed } from '@angular/core/testing';

import { AgentDashboardServiceService } from './agent-dashboard-service.service';

describe('AgentDashboardServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgentDashboardServiceService = TestBed.get(AgentDashboardServiceService);
    expect(service).toBeTruthy();
  });
});
