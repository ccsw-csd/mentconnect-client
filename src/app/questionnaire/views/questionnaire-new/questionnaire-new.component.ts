import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Location } from '@angular/common';
import { Question } from '../../model/Question';
import { QuestionService } from '../../services/question.service';
import { QuestionQuestionnaireComponent } from '../question-questionnaire/question-questionnaire.component';
import { QuestionnaireQuestion } from '../../model/QuestionnaireQuestion';

@Component({
  selector: 'app-questionnaire-new',
  templateUrl: './questionnaire-new.component.html',
  styleUrls: ['./questionnaire-new.component.scss'],
  providers: [DialogService, DynamicDialogRef, MessageService]
})
export class QuestionnaireNewComponent implements OnInit {
  isloading: boolean = false;
  questions: Question[] = [];
  questionnairesQuestion: QuestionnaireQuestion[] = [];
  // questionnaires: Questionnaire[] = [];
  // questionnairesPatient: QuestionnairePatient[] = [];
  loading: boolean = true;
  lastTableLazyLoadEvent: LazyLoadEvent;
  questionSelected: Question;
  questionDisabled: Boolean;
  //questionnairesAvailablesPatient: Questionnaire[] = [];
  questionsNumber = 0;
  public allQuestionnairesSelected: QuestionnaireQuestion[] = [];

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
    private dialogService: DialogService,
    private ref: DynamicDialogRef) { }

  ngOnInit(): void {
    this.questionDisabled = true;
    this.chargeQuestionnaires();
  }

  chargeQuestionnaires(){
      this.questionService.findAllQuestions().subscribe(questionsArray =>{
        this.questions = questionsArray; 
      });
      //this.questionnairesQuestion.push(new QuestionnaireQuestion(null,null,null,null));
      console.log(this.questionnairesQuestion);
  }

  disabled() {
    if (this.questionSelected == null) {
      this.questionDisabled = true;
    } else {
      this.questionDisabled = false;
    }
  }

  toSelect(question:Question) {
    const header = "Asignar pregunta";
    this.ref = this.dialogService.open(QuestionQuestionnaireComponent, {
      header: header,
      height: '580px',
      data: {
        question: question,
        loading: this.loading
      },
      closable: false
    });

    this.ref.onClose.subscribe(res =>{
      //this.questionnairesQuestion.push(res);
      //this.questionnairesQuestion = res;
      this.questionnairesQuestion = this.questionnairesQuestion.concat(res);
      this.chargeQuestionnaires();
    });
    
  }

  onCancel(event) {
    this.router.navigate(["questionnaire"]);
  }

}
