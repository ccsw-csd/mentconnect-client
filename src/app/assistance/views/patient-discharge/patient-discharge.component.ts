import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Role } from '../../models/Role';
import { UserFull } from '../../models/UserFull';
import { PatientFull } from '../../models/PatientFull';
import { PatientService } from '../../services/patient/patient.service';

interface Gender {
  value: string,
  code: string
}

@Component({
  selector: 'app-patient-discharge',
  templateUrl: './patient-discharge.component.html',
  styleUrls: ['./patient-discharge.component.scss']
})
export class PatientDischargeComponent implements OnInit {

  genders: Gender[];
  roles : Role[];
  patientRoles : Role[] = [];
  patientObj : PatientFull;
  userObj : UserFull;

  constructor(
    private patientService: PatientService,
    private translate: TranslateService
  ) {
    this.genders = [
      {value: this.translate.instant('patientDischarge.form.input.sex.male'), code: 'H'},
      {value: this.translate.instant('patientDischarge.form.input.sex.female'), code: 'M'},
      {value: this.translate.instant('patientDischarge.form.input.sex.other'), code: '0'},
    ];
   }

  ngOnInit(): void {
    this.roles = JSON.parse(sessionStorage.getItem("roles"));

    this.roles.forEach(rol => {
      if(rol.code == "PAT_INFO" || rol.code == "PAT_PHOTO"){
        this.patientRoles.push(rol);
      }
    });
  }

  toRegister(patient:any){
    this.userObj = new UserFull(patient.username, patient.name, patient.surnames, patient.email, this.patientRoles);
    this.patientObj = new PatientFull(this.userObj, patient.nif, patient.gender, patient.dateBirth, patient.phone, patient.sip, patient.medicalHistory);

    this.patientService.registerPatient(this.patientObj).subscribe();
  }
}
