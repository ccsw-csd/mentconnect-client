import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Role } from '../../../management/models/Role';
import { UserFull } from '../../../management/models/UserFull';
import { PatientFull } from '../../models/PatientFull';
import { PatientService } from '../../services/patient/patient.service';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RoleService } from 'src/app/core/services/role.service';


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
  roles: Role[] = [];
  patientObj : PatientFull;
  userObj : UserFull;
  routeSub: any;

  constructor(
    private patientService: PatientService,
    private translate: TranslateService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute,
    private roleService: RoleService
  ) {
    //TODO : investigar centralizar genero
    this.genders = [
      {value: this.translate.instant('patientDischarge.form.input.gender.male'), code: 'H'},
      {value: this.translate.instant('patientDischarge.form.input.gender.female'), code: 'M'},
      {value: this.translate.instant('patientDischarge.form.input.gender.other'), code: 'O'},
    ];
  }

  ngOnInit(): void {
    this.patientObj = new PatientFull(new UserFull(),null, null, null, null, null, null);
    this.routeSub = this.route.params.subscribe(params => {
      this.getPatientFull(params['id']);
    });
    
    this.roleService.findRoles().subscribe(rolesArray =>
      this.roles = [...this.roles,...rolesArray]
    );
  }

  toEdit(patient: PatientFull){ 
    this.userObj = new UserFull(patient.user.username, patient.user.name, patient.user.surnames, patient.user.email, patient.user.roles);
    this.patientObj = new PatientFull(this.userObj, patient.nif, patient.gender, patient.dateBirth, patient.phone, patient.sip, patient.medicalHistory);

    this.isloading = true; 
    this.patientService.modifyPatient(patient.id, this.patientObj.nif, this.userObj, this.patientObj.gender, this.patientObj.phone, this.patientObj.sip, this.patientObj.medicalHistory, this.parsetoIsoDate(patient.dateBirth),).subscribe({
      next: (res:PatientFull) => {
        this.isloading = false;
        //patient.resetForm();
        this.messageService.add({key: 'patientDischargeMessage', severity:'success', summary: this.translate.instant('patientDischarge.form.patientDischargeMessage.success.title'), detail: this.translate.instant('patientDischarge.form.patientDischargeMessage.success.detail')});
      },
      error: (err:any) => {
        this.isloading = false;
        //patient.resetForm();
        this.messageService.add({key: 'patientDischargeMessage', severity:'error', summary: this.translate.instant('patientDischarge.form.patientDischargeMessage.error.title'), detail: this.translate.instant('patientDischarge.form.patientDischargeMessage.error.detail')});
      }
    });
  }

  getPatientFull(id: number){
    this.patientService.patientFull(id).subscribe({
      next: (res) => {
        this.patientObj = res
        console.log(res.dateBirth);
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
