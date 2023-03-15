import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserFull } from '../../../management/models/UserFull';
import { PatientFull } from '../../models/PatientFull';
import { PatientService } from '../../services/patient/patient.service';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Role } from 'src/app/management/models/Role';
import { RoleService } from 'src/app/core/services/role.service';
import { Questionnaire } from 'src/app/questionnaire/model/Questionnaire';
import { QuestionnaireService } from 'src/app/questionnaire/services/questionnaire.service';
import { QuestionnairePatient } from 'src/app/questionnaire/model/QuestionnairePatient';
import { QuestionnairePatientService } from 'src/app/questionnaire/services/questionnaire-patient.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PatientQuestionnaireComponent } from '../patient-questionnaire/patient-questionnaire.component';

@Component({
  selector: 'app-patient-evaluation',
  templateUrl: './patient-evaluation.component.html',
  styleUrls: ['./patient-evaluation.component.scss'],
  providers: [DialogService, DynamicDialogRef, MessageService]
})
export class PatientEvaluationComponent implements OnInit {
  isloading: boolean = false;
  patientObj: PatientFull;
  userObj: UserFull;
  roles: Role[] = [];
  questionnaires: Questionnaire[] = [];
  questionnairesPatient: QuestionnairePatient[] = [];
  loading: boolean = true;
  lastTableLazyLoadEvent: LazyLoadEvent;
  questionnaireSelected : Questionnaire;
  constructor(
    private patientService: PatientService,
    private translateService: TranslateService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute,
    public datepipe: DatePipe,
    private router: Router,
    private roleService: RoleService,
    private questionnaireService: QuestionnaireService,
    private questionnairePatientService: QuestionnairePatientService,
    private dialogService: DialogService,
    private ref: DynamicDialogRef) {
     }

  ngOnInit(event?:LazyLoadEvent): void {
    this.patientObj = new PatientFull(new UserFull(), null, null, null, null, null, null);
    this.route.params.subscribe(params => {
      this.getPatientFull(params['id']);
      this.questionnairePatientService.findQuestionnairesPatientById(params['id']).subscribe(questionnairesPatientArray =>
        this.questionnairesPatient = [...this.questionnairesPatient,...questionnairesPatientArray]
      );
    });
    this.roleService.findByType("EXT").subscribe(rolesArray =>
      this.roles = [...this.roles,...rolesArray]
    );
    this.questionnaireService.findQuestionnaires().subscribe(questionnairesArray =>
      this.questionnaires = [...this.questionnaires,...questionnairesArray]
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

  toAssign(questionnaire: Questionnaire){
    if(this.questionnaireSelected==null){
      this.messageService.add({key: 'questionnaireEmptyMessage', severity:'error', summary: "Cuestionario vacío", detail: "Debe seleccionar un elemento de la lista de cuestionarios disponibles para asignarlos"});
    }else{
      this.ref = this.dialogService.open(PatientQuestionnaireComponent, {
        header: 'Asignar cuestionario: ' + questionnaire.description,
        width: '850px',
        height: '530px',
        data: {
          questionnaire: questionnaire, loading: this.loading,
          lastTableLazyLoadEvent: this.lastTableLazyLoadEvent
        },
        closable: false
      });
  
      this.ref.onClose.subscribe(res =>{
        this.ngOnInit(this.lastTableLazyLoadEvent);
      });
    }

  }

}
