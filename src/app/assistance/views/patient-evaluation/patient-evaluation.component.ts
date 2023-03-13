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
import { Role } from 'src/app/management/models/Role';
import { RoleService } from 'src/app/core/services/role.service';


@Component({
  selector: 'app-patient-evaluation',
  templateUrl: './patient-evaluation.component.html',
  styleUrls: ['./patient-evaluation.component.scss'],
  providers: [MessageService]
})
export class PatientEvaluationComponent implements OnInit {
  isloading: boolean = false;
  patientObj: PatientFull;
  userObj: UserFull;
  roles: Role[] = [];
  constructor(
    private patientService: PatientService,
    private translateService: TranslateService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute,
    public datepipe: DatePipe,
    private router: Router,
    private roleService: RoleService) {
     }

  ngOnInit(): void {
    this.patientObj = new PatientFull(new UserFull(), null, null, null, null, null, null);
    this.route.params.subscribe(params => {
      this.getPatientFull(params['id']);
    });
    this.roleService.findByType("EXT").subscribe(rolesArray =>
      this.roles = [...this.roles,...rolesArray]
    );
  }

  getPatientFull(id: number) {
    this.patientService.patientFull(id).subscribe({
      next: (res) => {
        this.patientObj = res
        this.patientObj.dateBirth = new Date(this.patientObj.dateBirth)
      }
    });
  }

  onCancel(event) {
    this.location.back();
  }

  parsetoIsoDate(date): Date {
    let tDate = new Date(date);
    tDate.setMinutes(tDate.getMinutes() - tDate.getTimezoneOffset());
    return tDate;
  }

  getTranslate(role:String){
    let roleFormated: string = "";
    
    this.translateService.get("patientEvaluation.role.code."+role+".title").subscribe((text:string) =>{
      roleFormated = text + "\n";
    })
    return roleFormated;
  } 

  getTranslateDetail(role:String){
    let roleFormated: string = "";
    
    this.translateService.get("patientEvaluation.role.code."+role+".detail").subscribe((text:string) =>{
      roleFormated = text + "\n";
    })
    return roleFormated;
  } 

}
