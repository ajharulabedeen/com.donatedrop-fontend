import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordClearComponent } from './record-clear.component';

describe('RecordClearComponent', () => {
  let component: RecordClearComponent;
  let fixture: ComponentFixture<RecordClearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordClearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordClearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
