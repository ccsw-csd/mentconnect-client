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
import { Questionnaire } from '../../model/Questionnaire';
import { QuestionnaireService } from '../../services/questionnaire.service';
import { QuestionnaireQuestionService } from '../../services/questionnaire-question.service';

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
  loading: boolean = true;
  lastTableLazyLoadEvent: LazyLoadEvent;
  questionSelected: Question;
  questionDisabled: Boolean;
  questionsNumber = 0;
  filteredQuestions: Question[];
  questionnaireObj: Questionnaire;

  constructor(    
    //private patientService: PatientService,
    private translateService: TranslateService,
    private questionnaireService: QuestionnaireService,
    private questionnaireQuestionService: QuestionnaireQuestionService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute,
    public datepipe: DatePipe,
    private router: Router,
    // private roleService: RoleService,
    private questionService: QuestionService,
    private dialogService: DialogService,
    private ref: DynamicDialogRef,
    ) { }

  ngOnInit(): void {
    this.questionDisabled = true;
    this.chargeQuestionnaires();

  }

  chargeQuestionnaires(){
      this.questionService.findAllQuestions().subscribe(questionsArray =>{
        this.questions = questionsArray; 
        this.filteredQuestions = this.filterQuestionnaires(this.questions,this.questionnairesQuestion);
      });
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
      this.questionnairesQuestion = this.questionnairesQuestion.concat(res);
      this.chargeQuestionnaires();
    });
    
  }
  

  filterQuestionnaires(questions,questionsSelected):Question[] {
    const questionsSelectedIDs = new Set(questionsSelected.map(({ question }) => question.id));
    this.filteredQuestions = [
      ...questionsSelected.filter(({ question }) => !questionsSelectedIDs.has(question.id)),
      ...questions.filter(({ id }) => !questionsSelectedIDs.has(id))
    ];
    this.questionDisabled = true;
    return this.filteredQuestions;
  }

  saveQuestionnaire(questionnaire){
    if(this.questionnairesQuestion.length>0){
      const newQuestionnaire = new Questionnaire(
        questionnaire.description,
        questionnaire.questions = this.questionnairesQuestion
      );

      this.questionnaireService.saveQuestionnaire(newQuestionnaire).subscribe({
        
        next: (res:Questionnaire) => {
          // this.questionnairesQuestion.forEach((questionnaireQuestion) => {
          //   questionnaireQuestion.questionnaire = res;
          // });
          // this.questionnaireQuestionService.saveQuestionnaireQuestions(this.questionnairesQuestion).subscribe({
          //   next:(res:QuestionnaireQuestion[]) => {
          //     this.router.navigate(["questionnaire"]);
          //   },error:(err:any) => {
          //     console.log("error")
          //   }
          // });
          // this.isloading = false;
          questionnaire.resetForm();
          this.messageService.add({key: 'questionnaireNew', severity:'success', summary: 'Cuestionario añadido', detail: 'Cuestionario añadido con éxito'});
          
        },
        error: (err:any) => {
          // this.isloading = false;
          questionnaire.resetForm();
          this.messageService.add({key: 'questionnaireNew', severity:'error', summary: 'Cuestionario no añadido', detail: 'Cuestionario NO añadido con éxito'});
        }
      });
      
    }else{
      console.log("Debe haber al menos una pregunta en el cuestionario");
    }
  }

  onCancel(event) {
    this.router.navigate(["questionnaire"]);
  }

}
