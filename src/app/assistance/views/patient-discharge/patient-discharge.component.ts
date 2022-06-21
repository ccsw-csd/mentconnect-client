import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Role } from '../../models/Role';
import { UserFull } from '../../../management/models/UserFull';
import { PatientFull } from '../../models/PatientFull';
import { PatientService } from '../../services/patient/patient.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

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
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.roles = JSON.parse(sessionStorage.getItem("roles"));
    //this.genders = this.activatedRoute.snapshot.data['genders'];
    this.activatedRoute.data.subscribe(({ genders }) => {
      this.genders = genders;
    });
    this.roles.forEach(rol => {
      if(rol.code == "PAT_INFO" || rol.code == "PAT_PHOTO"){
        this.patientRoles.push(rol);
      }
    });
  }

  toRegister(patient:any) {

    this.userObj = new UserFull(patient.username, patient.name, patient.surnames, patient.email, this.patientRoles);
    this.patientObj = new PatientFull(this.userObj, patient.nif, patient.gender, this.parsetoIsoDate(patient.dateBirth), patient.phone, patient.sip, patient.medicalHistory);

    this.isloading = true;
    this.patientService.registerPatient(this.patientObj).subscribe({
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
}
