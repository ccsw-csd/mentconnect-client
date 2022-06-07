import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Role } from '../../models/Role';
import { UserFull } from '../../models/UserFull';
import { Patient } from '../../models/Patient';
import { PatientService } from '../../services/patient/patient.service';
import { FormGroup } from '@angular/forms';

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
  }

  toRegister(patient:any){
    console.log(patient);
    //En patint tienes todos los campos del from y tienes que contruir el objeto Patient

    //patientRoles = [this.roles[2], this.roles[3]]; //No hacerlo por id si no por code

    //this.patientService.registerPatient(objetoPatient).subscribe();
  }
}
