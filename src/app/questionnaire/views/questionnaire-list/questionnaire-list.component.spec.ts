import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { delay, filter, of } from 'rxjs';

import { QuestionnaireListComponent } from './questionnaire-list.component';
import { HttpClientTestingModule, HttpTestingController } from  '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { QuestionnaireService } from '../../services/questionnaire.service';
import { UserService } from '../../services/user.service';
import { QuestionnairePage } from '../../model/QuestionnairePage';
import { Questionnaire } from '../../model/Questionnaire';

describe('QuestionnaireListComponent', () => {
  let component: QuestionnaireListComponent;
  let fixture: ComponentFixture<QuestionnaireListComponent>;

  let mockQuestionnaireService;
  let mockUserService;
  let questionnaire
  let user
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

    questionnaire = [{"id":1,"description":"prueba","questionsNumber":0,"patientsNumber":0,
  "user":{"id":1,"username":"admin","name":"Admin","surnames":"Mentconnect","email":"admin@meentconnect.com"},
  "createDate":"2022-05-30","lastEditDate":"2022-05-30"}];
    user = [{ "id": 1, "username": "admin", "name": "Admin", "surnames": "Mentconnect", "email": "admin@meentconnect.com" }];


   
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('loadPage', () =>{

    it('should call loadPage', () =>{

      
      let questionnairePage = new QuestionnairePage();

      questionnaire.pageSize = 5;

      mockUserService.getUsers.and.returnValue(of(user));
      mockQuestionnaireService.getQuestionnaires.and.returnValue(of(questionnaire,questionnairePage.pageable,questionnaire.pageSize));
      
      component.loadPage();

      expect(component.pageSize).toEqual(questionnaire.pageSize);
     // expect(mockQuestionnaireService.getQuestionnaires.subscribe).toHaveBeenCalled();
    });

  });

 
});