import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from  '@angular/common/http/testing';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ 
      imports: [HttpClientTestingModule],
      providers:[UserService]
    });
    service = TestBed.get(UserService); 
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getUsers and expect GET', () =>{

    service.getUsers().subscribe(() =>{});

    const testRequest = httpMock.expectOne(environment.server+'/user/findAll');
    expect(testRequest.request.method).toBe("GET");
    httpMock.verify();
  });

});
