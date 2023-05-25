import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireNewComponent } from './questionnaire-new.component';

describe('QuestionnaireNewComponent', () => {
  let component: QuestionnaireNewComponent;
  let fixture: ComponentFixture<QuestionnaireNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionnaireNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
