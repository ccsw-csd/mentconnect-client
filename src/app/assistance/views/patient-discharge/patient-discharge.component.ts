import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Patient } from '../../models/Patient';
import { PatientService } from '../../services/patient/patient.service';

interface Sex {
  sex: string,
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

  patient = {} as Patient;

  constructor(
    private patientService: PatientService,
    private translate: TranslateService
  ) {
    this.sex = [
      {sex: this.translate.instant('patientDischarge.form.input.sex.male'), code: 'M'},
      {sex: this.translate.instant('patientDischarge.form.input.sex.female'), code: 'F'},
      {sex: 'NS/NC', code: '0'},
    ];
   }

  ngOnInit(): void {
  }

  toRegister(){
    if(this.sexValue != null) this.patient.sex = this.sexValue.code;

    this.patientService.registerPatient(this.patient).subscribe();
  }
}
