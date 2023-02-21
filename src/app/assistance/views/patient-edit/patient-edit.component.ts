import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Role } from '../../../management/models/Role';
import { UserFull } from '../../../management/models/UserFull';
import { PatientFull } from '../../models/PatientFull';
import { PatientService } from '../../services/patient/patient.service';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';

interface Gender {
  value: string,
  code: string
}

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.scss'],
  providers: [MessageService]
})
export class PatientEditComponent implements OnInit {

  isloading : boolean = false;
  genders: Gender[];
  roles : Role[];
  patientRoles : Role[] = [];
  patientObj : PatientFull;
  userObj : UserFull;

  constructor(
    private patientService: PatientService,
    private translate: TranslateService,
    private messageService: MessageService,
    private location: Location
  ) {
    //TODO : investigar centralizar genero
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

  toEdit(patient: any){
    this.userObj = new UserFull(patient.user.name, patient.user.surnames, patient.user.email, this.patientRoles);
    this.patientObj = new PatientFull(this.userObj, patient.nif, patient.gender, this.parsetoIsoDate(patient.dateBirth), patient.phone, patient.sip, patient.medicalHistory);

    this.isloading = true; 
    this.patientService.modifyPatient(this.patientObj.id, this.patientObj.nif, this.userObj, this.patientObj.gender, this.patientObj.phone, this.patientObj.sip, this.patientObj.medicalHistory, this.parsetoIsoDate(patient.dateBirth),).subscribe({
      next: (res:PatientFull) => {
        this.isloading = false;
        patient.resetForm();
        this.messageService.add({key: 'patientDischargeMessage', severity:'success', summary: this.translate.instant('patientDischarge.form.patientDischargeMessage.success.title'), detail: this.translate.instant('patientDischarge.form.patientDischargeMessage.success.detail')});
      },
      error: (err:any) => {
        this.isloading = false;
        patient.resetForm();
        this.messageService.add({key: 'patientDischargeMessage', severity:'error', summary: this.translate.instant('patientDischarge.form.patientDischargeMessage.error.title'), detail: this.translate.instant('patientDischarge.form.patientDischargeMessage.error.detail')});
      }
    });
  }


  parsetoIsoDate(date) : Date {
    const tDate = new Date(date);
    tDate.setMinutes(tDate.getMinutes() - tDate.getTimezoneOffset());

    return tDate;
  }

  onCancel(event){
    this.location.back();
  }
}
