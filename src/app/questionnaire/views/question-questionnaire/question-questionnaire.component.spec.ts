import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionQuestionnaireComponent } from './question-questionnaire.component';

describe('QuestionQuestionnaireComponent', () => {
  let component: QuestionQuestionnaireComponent;
  let fixture: ComponentFixture<QuestionQuestionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionQuestionnaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionQuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
