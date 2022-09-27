import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { QuestionnaireListComponent } from './questionnaire-list.component';
import { HttpClientTestingModule } from  '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { QuestionnaireService } from '../../services/questionnaire.service';
import { UserService } from '../../services/user.service';
import { Questionnaire } from '../../model/Questionnaire';
import { LazyLoadEvent } from 'primeng/api';
import { QuestionnairePage } from '../../model/QuestionnairePage';
import { Pageable } from 'src/app/core/models/Pageable';

describe('QuestionnaireListComponent', () => {
  let component: QuestionnaireListComponent;
  let fixture: ComponentFixture<QuestionnaireListComponent>;
  let mockQuestionnaireService;
  let mockUserService;
  let user:any[];
  let pageable: Pageable = {
    pageNumber: 1,
    pageSize: 10,
    sort: [{
      property: null,
      direction: null
    }]
  }
  let QUESTIONNAIRES_ITEM = [
    new Questionnaire({id:1, description: "Desc 1",questions:null,patients:null,user:null,createDate:null,lastEditDate:null})
  ];

  

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

    user = [{ "id": 1, "username": "admin", "name": "Admin", "surnames": "Mentconnect", "email": "admin@meentconnect.com" }];

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return questionnairesPage', () =>{

    let event = {} as LazyLoadEvent;
    event = {first: 0, rows: 10}

    let questionnairePage = new QuestionnairePage()
    questionnairePage.content = QUESTIONNAIRES_ITEM;
    questionnairePage.pageable = pageable;

    mockQuestionnaireService.getQuestionnaires.and.returnValue(of(questionnairePage));
    mockUserService.getUsers.and.returnValue(of(user));
    component.loadPage(event);

    expect(component.pageNumber).toEqual(questionnairePage.pageable.pageNumber);
    expect(component.questionnaires).toEqual(QUESTIONNAIRES_ITEM);

  });

  it('find with filters should return questionnairesPage', () =>{

    let event = {} as LazyLoadEvent;
    event = {first: 0, rows: 10}

    let questionnairePage = new QuestionnairePage()
    questionnairePage.content = QUESTIONNAIRES_ITEM;
    questionnairePage.pageable = pageable;

    let description: {value: 'Desc', matchMode: 'equals'}
    let patientsNumber: {value: 2, matchMode: 'like'}
    let questionsNumber: {value: 3, matchMode: 'like'}
    let user: {value: [{ "id": 1, "username": "admin", "name": "Admin", "surnames": "Mentconnect", "email": "admin@meentconnect.com" }], matchMode: 'equals'}
    event = { filters: {description: description, questionsNumber:questionsNumber, patientsNumber:patientsNumber, user:user} };

    mockQuestionnaireService.getQuestionnaires.and.returnValue(of(questionnairePage));
    mockUserService.getUsers.and.returnValue(of(user));
    component.loadPage(event);

    expect(component.pageNumber).toEqual(questionnairePage.pageable.pageNumber);
    expect(component.questionnaires).toEqual(QUESTIONNAIRES_ITEM);

  });

});