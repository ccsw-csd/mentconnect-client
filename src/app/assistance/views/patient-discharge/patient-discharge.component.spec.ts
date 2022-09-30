import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { PatientDischargeComponent } from './patient-discharge.component';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';

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
      imports: [HttpClientTestingModule, TranslateModule.forRoot(), FormsModule, ReactiveFormsModule]
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
    mockMessageService = jasmine.createSpyObj(['add']);
    component = new PatientDischargeComponent(mockPatientService, mockTranslateService, mockMessageService);

    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  

  describe('toRegister', () =>{
    it('should call toRegister', () =>{
      sessionStorage.setItem("roles", '[{"id":1,"code":"ADMIN","type":"INT"}]')
      component.patientRoles=[{id: 3, code: "PAT_INFO", type: null}]
      let patient: NgForm = <NgForm>{
        resetForm: () => null,
        value: PATIENT,
        valid: true
      };

      mockPatientService.registerPatient.and.returnValue(of(true));
      component.toRegister(patient);
      
      expect(mockPatientService.registerPatient).toHaveBeenCalled();
    });

    it('should call toRegister with specific parameter', () =>{
      let patient: NgForm = <NgForm>{
        resetForm: () => null,
        value: PATIENT,
        valid: true
      };
      mockPatientService.registerPatient.and.returnValue(of(true));
      component.toRegister(patient);
      
      expect(mockPatientService.registerPatient).toHaveBeenCalledWith(component.patientObj);
    });

    it('should suscribe when call toRegister', () =>{
      let patient: NgForm = <NgForm>{
        resetForm: () => null,
        value: PATIENT,
        valid: true
      };
      mockPatientService.registerPatient.and.returnValue(of(true));
      component.toRegister(patient);
      
      expect(mockPatientService.registerPatient.subscribe).toHaveBeenCalled;
    });
  });
});
