import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Location } from '@angular/common';
import { Question } from '../../model/Question';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-questionnaire-new',
  templateUrl: './questionnaire-new.component.html',
  styleUrls: ['./questionnaire-new.component.scss'],
  providers: [DialogService, DynamicDialogRef, MessageService]
})
export class QuestionnaireNewComponent implements OnInit {
  isloading: boolean = false;
  questions: Question[] = [];
  // questionnaires: Questionnaire[] = [];
  // questionnairesPatient: QuestionnairePatient[] = [];
  loading: boolean = true;
  lastTableLazyLoadEvent: LazyLoadEvent;
  //questionnaireSelected: Questionnaire;
  questionnaireDisabled: Boolean;
  //questionnairesAvailablesPatient: Questionnaire[] = [];
  questionsNumber = 0;
  constructor(    
    //private patientService: PatientService,
    private translateService: TranslateService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute,
    public datepipe: DatePipe,
    private router: Router,
    // private roleService: RoleService,
    private questionService: QuestionService,
    // private questionnairePatientService: QuestionnairePatientService,
    private dialogService: DialogService,
    private ref: DynamicDialogRef) { }

  ngOnInit(): void {
    this.chargeQuestionnaires();
  }

  chargeQuestionnaires(){
      this.questionService.findAllQuestions().subscribe(questionsArray =>{
        this.questions = questionsArray; 
      }
      );
  }

  toAssign() {
    // const header = this.translateService.instant('patientEvaluation.dialogAsignation.header');
    // this.ref = this.dialogService.open(PatientQuestionnaireComponent, {
    //   header: header + ": " +  questionnaire.description,
    //   data: {
    //     questionnaire: questionnaire,
    //     loading: this.loading,
    //     patient: this.patientObj
    //   },
    //   closable: false
    // });

    // this.ref.onClose.subscribe(res =>{
    //   this.chargeQuestionnaires();
    // });
  }

  onCancel(event) {
    this.router.navigate(["questionnaire"]);
  }

}
