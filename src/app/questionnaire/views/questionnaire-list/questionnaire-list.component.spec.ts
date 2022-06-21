import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { delay, filter, of } from 'rxjs';
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
  let questionnaire;
  let user:any[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, TranslateModule.forRoot()],
      declarations: [QuestionnaireListComponent],

      providers:[QuestionnaireService,UserService]

    }).compileComponents();

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

      mockQuestionnaireService.getQuestionnaires.and.returnValue(of(questionnaire));
      mockUserService.getUsers.and.returnValue(of(user));
      component.loadPage(questionnaire);
      questionnaire.pageSize = 10;
   
      expect(mockQuestionnaireService.getQuestionnaires).toHaveBeenCalled;
      expect(component.pageSize).toEqual(questionnaire.pageSize)
    });

  });
});