import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientEvaluationComponent } from './patient-evaluation.component';

describe('PatientEvaluationComponent', () => {
  let component: PatientEvaluationComponent;
  let fixture: ComponentFixture<PatientEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientEvaluationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
