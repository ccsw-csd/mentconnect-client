import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { PatientDischargeComponent } from './patient-discharge.component';

describe('PatientDischargeComponent', () => {
  let component: PatientDischargeComponent;
  let fixture: ComponentFixture<PatientDischargeComponent>;
  let PATIENT;
  let mockPatientService;
  let mockTranslateService;
  let mockMessageService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientDischargeComponent ],
      imports: [HttpClientTestingModule, TranslateModule.forRoot()]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDischargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

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
    mockPatientService = jasmine.createSpyObj(['registerPatient']);
    mockTranslateService = jasmine.createSpyObj(['instant']);
    mockMessageService = jasmine.createSpyObj(['']);
    component = new PatientDischargeComponent(mockPatientService, mockTranslateService, mockMessageService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  

  describe('toRegister', () =>{
    it('should call toRegister', () =>{
      mockPatientService.registerPatient.and.returnValue(of(true));
      component.patientObj = PATIENT;
      component.toRegister(component.patientObj);
      
      expect(mockPatientService.registerPatient).toHaveBeenCalled();
    });

    it('should call toRegister with specific parameter', () =>{
      mockPatientService.registerPatient.and.returnValue(of(true));
      component.patientObj = PATIENT;
      component.toRegister(component.patientObj);
      
      expect(mockPatientService.registerPatient).toHaveBeenCalledWith(component.patientObj);
    });

    it('should suscribe when call toRegister', () =>{
      mockPatientService.registerPatient.and.returnValue(of(true));
      component.patientObj = PATIENT;
      component.toRegister(component.patientObj);
      
      expect(mockPatientService.registerPatient.subscribe).toHaveBeenCalled;
    });
  });
});
