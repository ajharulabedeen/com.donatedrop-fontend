import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonnerAssigningComponent } from './donner-assigning.component';

describe('DonnerAssigningComponent', () => {
  let component: DonnerAssigningComponent;
  let fixture: ComponentFixture<DonnerAssigningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonnerAssigningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonnerAssigningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
