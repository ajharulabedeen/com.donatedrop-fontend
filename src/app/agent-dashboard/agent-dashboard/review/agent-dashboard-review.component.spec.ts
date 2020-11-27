import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentDashboardReviewComponent } from './agent-dashboard-review.component';

describe('AgentDashboardReviewComponent', () => {
  let component: AgentDashboardReviewComponent;
  let fixture: ComponentFixture<AgentDashboardReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentDashboardReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentDashboardReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
