import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Role } from '../../models/Role';
import { UserFull } from '../../models/UserFull';
import { Patient } from '../../models/Patient';
import { PatientService } from '../../services/patient/patient.service';
import { FormGroup } from '@angular/forms';

interface Sex {
  value: string,
  code: string
}

@Component({
  selector: 'app-patient-discharge',
  templateUrl: './patient-discharge.component.html',
  styleUrls: ['./patient-discharge.component.scss']
})
export class PatientDischargeComponent implements OnInit {
  sex: Sex[];
  sexValue : Sex;
  roles : Role[];

  patient = {} as Patient;
  user = {} as UserFull;

  constructor(
    private patientService: PatientService,
    private translate: TranslateService
  ) {
    this.sex = [
      {value: this.translate.instant('patientDischarge.form.input.sex.male'), code: 'H'},
      {value: this.translate.instant('patientDischarge.form.input.sex.female'), code: 'M'},
      {value: this.translate.instant('patientDischarge.form.input.sex.other'), code: '0'},
    ];
   }

  ngOnInit(): void {
    this.roles = JSON.parse(sessionStorage.getItem("roles"));
  }

  toRegister(){
    this.user.roles = [this.roles[2], this.roles[3]];
    this.patient.user = this.user;
    if(this.sexValue != null) this.patient.sex = this.sexValue.code;
    
    console.log(this.patient);

    //this.patientService.registerPatient(this.patient).subscribe();
  }
}
