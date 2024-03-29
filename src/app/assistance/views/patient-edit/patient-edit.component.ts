import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserFull } from '../../../management/models/UserFull';
import { PatientFull } from '../../models/PatientFull';
import { PatientService } from '../../services/patient/patient.service';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

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
  patientObj : PatientFull;
  userObj : UserFull;
  constructor(
    private patientService: PatientService,
    private translate: TranslateService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute,
    public datepipe: DatePipe,
    private router:Router
  ) {
    this.genders = [
      {value: this.translate.instant('patientEdit.form.input.gender.male'), code: 'H'},
      {value: this.translate.instant('patientEdit.form.input.gender.female'), code: 'M'},
      {value: this.translate.instant('patientEdit.form.input.gender.other'), code: 'O'},
    ];
  }

  ngOnInit(): void {
    this.patientObj = new PatientFull(new UserFull(),null, null, null, null, null, null);
    this.route.params.subscribe(params => {
      this.getPatientFull(params['id']);
    });

  }

  toEdit(patient: PatientFull){ 
    this.userObj = new UserFull(patient.user.username, patient.user.name, patient.user.surnames, patient.user.email, patient.user.roles);
    this.userObj.id = patient.user.id;
    this.patientObj = new PatientFull(this.userObj, patient.nif, patient.gender, this.parsetoIsoDate(patient.dateBirth), patient.phone, patient.sip, patient.medicalHistory);
    this.isloading = true; 
    this.patientService.modifyPatient(patient.id, this.patientObj.nif, this.userObj, this.patientObj.gender, this.patientObj.phone, this.patientObj.sip, this.patientObj.medicalHistory, this.parsetoIsoDate(this.patientObj.dateBirth)).subscribe({
      next: (res:PatientFull) => {
        this.isloading = false;
        this.messageService.add({key: 'patientEditMessage', severity:'success', summary: this.translate.instant('patientEdit.form.patientEditMessage.success.title'), detail: this.translate.instant('patientEdit.form.patientEditMessage.success.detail')});
        this.router.navigate(['patient-list']);
      },
      error: (err:any) => {
        this.isloading = false;
        this.messageService.add({key: 'patientEditMessage', severity:'error', summary: this.translate.instant('patientEdit.form.patientEditMessage.error.title'), detail: this.translate.instant('patientEdit.form.patientEditMessage.error.detail')});
      }
    });
  }

  getPatientFull(id: number){
    this.patientService.patientFull(id).subscribe({
      next: (res) => {
        this.patientObj = res
        this.patientObj.dateBirth = new Date(this.patientObj.dateBirth)
      }
    });
  }

  onCancel(event){
    this.location.back();
  }

  parsetoIsoDate(date) : Date {
    let tDate = new Date(date);
    tDate.setMinutes(tDate.getMinutes() - tDate.getTimezoneOffset());
    return tDate;
  }

}