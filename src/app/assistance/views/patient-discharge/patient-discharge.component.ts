import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Role } from '../../models/Role';
import { UserFull } from '../../models/UserFull';
import { PatientFull } from '../../models/PatientFull';
import { PatientService } from '../../services/patient/patient.service';
import { MessageService } from 'primeng/api';

interface Gender {
  value: string,
  code: string
}

@Component({
  selector: 'app-patient-discharge',
  templateUrl: './patient-discharge.component.html',
  styleUrls: ['./patient-discharge.component.scss'],
  providers: [MessageService]
})
export class PatientDischargeComponent implements OnInit {

  isloading : boolean = false;
  genders: Gender[];
  roles : Role[];
  patientRoles : Role[] = [];
  patientObj : PatientFull;
  userObj : UserFull;

  constructor(
    private patientService: PatientService,
    private translate: TranslateService,
    private messageService: MessageService
  ) {
    this.genders = [
      {value: this.translate.instant('patientDischarge.form.input.gender.male'), code: 'H'},
      {value: this.translate.instant('patientDischarge.form.input.gender.female'), code: 'M'},
      {value: this.translate.instant('patientDischarge.form.input.gender.other'), code: '0'},
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
    //TODO
    var usernameToLower = patient.username.toLowerCase();
    var date  = new Date(patient.dateBirth);
    var dateFormat = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 )).toISOString().split("T")[0];

    this.userObj = new UserFull(usernameToLower, patient.name, patient.surnames, patient.email, this.patientRoles);
    this.patientObj = new PatientFull(this.userObj, patient.nif, patient.gender, dateFormat, patient.phone, patient.sip, patient.medicalHistory);

    this.isloading = true;
    this.patientService.registerPatient(this.patientObj).subscribe({
      next: (res:PatientFull) => {
        this.isloading = false;
        patient.resetForm();
        this.messageService.add({key: 'patientDischargeMessage', severity:'success', summary: this.translate.instant('patientDischarge.form.patientDischargeMessage.success.title'), detail: this.translate.instant('patientDischarge.form.patientDischargeMessage.success.detail')});
      },
      error: (err:any) => {
        this.isloading = false;
        ['username', 'nif'].forEach(del => delete patient[del]);
        this.messageService.add({key: 'patientDischargeMessage', severity:'error', summary: this.translate.instant('patientDischarge.form.patientDischargeMessage.error.title'), detail: this.translate.instant('patientDischarge.form.patientDischargeMessage.error.detail')});
      }
    });
  }
}
