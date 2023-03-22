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
  questionnaireDisabled : Boolean;
  rolesSelected: Role[] = [];
  filteredQuestionnaires: (Questionnaire | QuestionnairePatient)[];
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

  ngOnInit(): void {
    this.questionnaireDisabled = true;
    this.patientObj = new PatientFull(new UserFull(), null, null, null, null, null, null);
    this.route.params.subscribe(params => {
      this.getPatientFull(params['id']);
      this.questionnairePatientService.findQuestionnairesPatientById(params['id']).subscribe(questionnairesPatientArray => {
        this.questionnairesPatient = [...this.questionnairesPatient,...questionnairesPatientArray];
        this.questionnaireService.findQuestionnaires().subscribe(
          questionnairesArray =>{ 
            this.questionnaires = [...this.questionnaires,...questionnairesArray];
            this.filteredQuestionnaires = this.filterQuestionnaires(this.questionnaires, this.questionnairesPatient);
          }
        ); 
      }
      );
      
    });
    this.roleService.findByType("EXT").subscribe(rolesArray =>
      this.roles = [...this.roles,...rolesArray]
    );
    
    
    
    
  }

  function1(queryarray) {

  }

  getPatientFull(id: number) {
    this.patientService.patientFull(id).subscribe({
      next: (res) => {
        this.patientObj = res
        this.patientObj.dateBirth = new Date(this.patientObj.dateBirth)
        this.rolesSelected = this.patientObj.user.roles;
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

  changeRoles(rolesSelected){
    this.patientObj.user.roles = rolesSelected;
    this.patientService.modifyPatient(this.patientObj.id, this.patientObj.nif, this.patientObj.user, this.patientObj.gender, this.patientObj.phone, this.patientObj.sip, this.patientObj.medicalHistory,this.patientObj.dateBirth).subscribe({
      next: () => {
        this.messageService.add({key: 'rolesEdited', severity:'success', summary: "Roles editados", detail: "Roles editados"});
        window.location.reload();
      },
      error: () => {
        this.messageService.add({key: 'rolesEdited', severity:'error', summary: "Roles no editados", detail: "Roles no editados"});
      }
    });

  }

  disabled(){
    if(this.questionnaireSelected==null){
      this.questionnaireDisabled = true;
    }else{
      this.questionnaireDisabled = false;
    } 
  }

  toAssign(questionnaire: Questionnaire){
      this.ref = this.dialogService.open(PatientQuestionnaireComponent, {
        header: 'Asignar cuestionario: ' + questionnaire.description,
        data: {
          questionnaire: questionnaire, 
          loading: this.loading,
          patient:this.patientObj
        },
        closable: false
      });
  }

  deleteAssign(questionnairePatient: QuestionnairePatient){
    this.questionnairePatientService.deleteQuestionnairePatient(questionnairePatient.id).subscribe({
      next: () => {
        window.location.reload();
        this.messageService.add({key: 'questionnaireAssignDeleted', severity:'success', summary: "Cuestionario eliminado", detail: "Cuestionario eliminado"});
      },
      error: () => {
        this.messageService.add({key: 'questionnaireAssignDeleted', severity:'error', summary: "Cuestionario no eliminado", detail: "Cuestionario no eliminado"});
      }
    }); 
  }

  filterQuestionnaires(questionnairesAvailables: Questionnaire[], questionnairesAssigned: QuestionnairePatient[]): (Questionnaire | QuestionnairePatient)[] {
    const questionnairesAssignedIDs = new Set(questionnairesAssigned.map(({ questionnaire }) => questionnaire.id));
    this.filteredQuestionnaires = [
      ...questionnairesAssigned.filter(({ questionnaire }) => !questionnairesAssignedIDs.has(questionnaire.id)),
      ...questionnairesAvailables.filter(({ id }) => !questionnairesAssignedIDs.has(id))
    ];
    return this.filteredQuestionnaires;
  }
}

