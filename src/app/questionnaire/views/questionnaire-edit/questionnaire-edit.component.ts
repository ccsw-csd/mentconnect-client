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
import { User } from 'src/app/management/models/User';

@Component({
  selector: 'app-questionnaire-edit',
  templateUrl: './questionnaire-edit.component.html',
  styleUrls: ['./questionnaire-edit.component.scss'],
  providers: [DialogService, DynamicDialogRef, MessageService]
})
export class QuestionnaireEditComponent implements OnInit {
  isloading: boolean = false;
  questions: Question[] = [];
  questionnairesQuestion: QuestionnaireQuestion[] = [];
  loading: boolean = true;
  lastTableLazyLoadEvent: LazyLoadEvent;
  questionSelected: Question;
  questionDeselected: QuestionnaireQuestion;
  questionDisabled: Boolean;
  questionDeselectedDisabled: Boolean;
  questionsNumber = 0;
  filteredQuestions: Question[];
  questionnaireObj: Questionnaire;

  constructor(    
    private translateService: TranslateService,
    private questionnaireService: QuestionnaireService,
    private questionnaireQuestionService: QuestionnaireQuestionService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute,
    public datepipe: DatePipe,
    private router: Router,
    private questionService: QuestionService,
    private dialogService: DialogService,
    private ref: DynamicDialogRef,
    ) { 

    }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.questionnaireObj = new Questionnaire(null, null, null, null, new User(), null, null);
    if (id) {
      this.getQuestionnaire(id); 
      
    }
    
    this.isloading = true;
    this.questionDisabled = true;
    this.questionDeselectedDisabled = true;
    this.chargeQuestionnaires();

  }

  chargeQuestionnaires(){
      this.questionService.findAllQuestions().subscribe(questionsArray =>{
        this.questions = questionsArray; 
        this.filteredQuestions = this.filterQuestionnaires(this.questions,this.questionnairesQuestion);
        this.isloading = false;
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
    const header = "questionnaireQuestion.assignQuestion"; 
    this.ref = this.dialogService.open(QuestionQuestionnaireComponent, {
      header: this.translateService.instant(header),
      height: '515px',
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

  disabledDeselected() {
    if (this.questionDeselected == null) {
      this.questionDeselectedDisabled = true;
    } else {
      this.questionDeselectedDisabled = false;
    }
  }

  toDeselect(question: QuestionnaireQuestion) {
    this.questionnairesQuestion = this.questionnairesQuestion.filter((element) => {
      if (element === question) {
        return false; 
      }
      return true; 
    });
    this.questionDeselectedDisabled = true;
    this.filterQuestionnaires(this.questions, this.questionnairesQuestion);
  }
  
  getQuestionnaire(id: number){
    this.questionnaireService.getQuestionnaire(id).subscribe({
      next: (res) => {
        this.questionnaireObj = res
        this.questionnairesQuestion = res.questions
      }
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
    if(this.questionnairesQuestion.length>0 && questionnaire.description!=null){
      const newQuestionnaire = new Questionnaire(
        questionnaire.id,
        questionnaire.description,
        questionnaire.questions = this.questionnairesQuestion,
        questionnaire.patients,
        questionnaire.user,
        questionnaire.createDate,
        questionnaire.lastEditDate
      );

      this.questionnaireService.saveQuestionnaire(newQuestionnaire).subscribe({
        next: (res:Questionnaire) => {
          this.router.navigate(["questionnaire"]);
        },
        error: (err:any) => {
          this.messageService.add({key: 'questionnaireNew', severity:'error', summary: 'Cuestionario no añadido', detail: 'Cuestionario NO añadido con éxito'});
        }
      });
      
     }else{
      this.messageService.add({key: 'questionnaireNew', severity:'error', summary: 'Cuestionario no añadido', detail: 'Debes insertar una descripción y al menos una pregunta al cuestionario'});
    }
  }

  onCancel(event) {
    this.router.navigate(["questionnaire"]);
  }

}
