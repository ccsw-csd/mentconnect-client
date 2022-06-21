import { TestBed } from '@angular/core/testing';

import { QuestionnaireService } from './questionnaire.service';
import { HttpClientTestingModule, HttpTestingController } from  '@angular/common/http/testing';
import { Pageable } from 'src/app/core/models/Pageable';
import { environment } from 'src/environments/environment';

describe('QuestionnaireService', () => {
  let service: QuestionnaireService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[QuestionnaireService]
    });
    service = TestBed.get(QuestionnaireService); 
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getQuestionnaires', () =>{

    let pageable: Pageable = {
      pageNumber: 0,
      pageSize: 10,
      sort: [{
        property: 'id',
        direction: 'ASC'
      }]
    }

    service.getQuestionnaires(pageable).subscribe(() =>{});  

    const testRequest = httpMock.expectOne(environment.server+'/questionnaire/findPage');
    expect(testRequest.request.method).toBe("POST");
    httpMock.verify();
  });
});
