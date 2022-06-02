import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule, HttpRequest} from '@angular/common/http';
import { PatientService } from './patient.service';
import { environment } from 'src/environments/environment';

describe('PatientService', () => {
  let service: PatientService;
  let httpMock: HttpTestingController;
  let PATIENT;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [PatientService]
    });

    PATIENT = {    
      NIF: "2398453N",
      sex: "H",
      age: 5,
      name: "nombre",
      surnames: "apellido",
      email: "@gmail.com",
      phone: "999999999",
      SIP: 213,
      clinic: 8
    };

    service = TestBed.get(PatientService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register the patient when registerPatient is called', () =>{
    service.registerPatient(PATIENT).subscribe((patientReturn) => {
      expect(patientReturn).toBe(PATIENT);
    });
    const req = httpMock.expectOne(environment.server+'/patientDischarge/register');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(PATIENT);
    httpMock.verify();
  });
});
