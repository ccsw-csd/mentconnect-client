import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { delay, of } from 'rxjs';

import { QuestionnaireListComponent } from './questionnaire-list.component';
import { HttpClientTestingModule, HttpTestingController } from  '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { QuestionnaireService } from '../../services/questionnaire.service';
import { UserService } from '../../services/user.service';

describe('QuestionnaireListComponent', () => {
  let component: QuestionnaireListComponent;
  let fixture: ComponentFixture<QuestionnaireListComponent>;

  let mockQuestionnaireService;
  let mockUserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, TranslateModule.forRoot()],
      declarations: [QuestionnaireListComponent],

      //providers:[{provide:QuestionnaireService, useValue: mockQuestionnaireService}]
      providers:[QuestionnaireService,UserService]

    }).compileComponents();

    /*fixture = TestBed.createComponent(QuestionnaireListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();*/

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mockQuestionnaireService = jasmine.createSpyObj(['getQuestionnaires']);
    mockUserService = jasmine.createSpyObj(['getUsers'])

    component = new QuestionnaireListComponent(mockQuestionnaireService,mockUserService);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('loadPage', () =>{

    it('should call loadPage', () =>{
      mockQuestionnaireService.getQuestionnaires.and.returnValue(of(true));
      
      component.loadPage();
      expect(mockQuestionnaireService.getQuestionnaires.subscribe).toHaveBeenCalled();
    });

  });

 
});