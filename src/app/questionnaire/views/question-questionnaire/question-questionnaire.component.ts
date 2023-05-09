import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Questionnaire } from 'src/app/questionnaire/model/Questionnaire';
import { QuestionnairePatient } from 'src/app/questionnaire/model/QuestionnairePatient';
import { QuestionnairePatientService } from 'src/app/questionnaire/services/questionnaire-patient.service';
import { QuestionnaireNewComponent } from '../questionnaire-new/questionnaire-new.component';
import { Question } from '../../model/Question';
import { QuestionnaireService } from '../../services/questionnaire.service';
import { AnswerTypeValue } from '../../model/AnswerTypeValue';
import { QuestionnaireQuestion } from '../../model/QuestionnaireQuestion';
import { QuestionnaireQuestionService } from '../../services/questionnaire-question.service';
import { WeekDay } from '../../model/WeekDay';

interface TimeSlot {
  value: string,
  code: string
}

@Component({
  selector: 'app-question-questionnaire',
  templateUrl: './question-questionnaire.component.html',
  styleUrls: ['./question-questionnaire.component.scss']
})
export class QuestionQuestionnaireComponent implements OnInit {
  isloading: boolean = false;
  slots: TimeSlot[];
  weekDays: WeekDay[];
  newwD: WeekDay[] = [];
  questionnairePatientObj: QuestionnairePatient;
  questionObj: Question;
  questionnaireAssigned: boolean;
  rangeDates: Date[];
  rangeDatesSelected: Date[];
  question: QuestionnaireNewComponent;
  selectedSlot: string = '';
  checkAlert: boolean = false;
  selectedDays: string[] = [];
  answersByType: AnswerTypeValue[] = [];
  questionnaireQuestionObj : QuestionnaireQuestion;
  public allQuestionnairesSelected: QuestionnaireQuestion[] = [];
  answerTypeValue: string;
  consecutiveAnswers: number;
  showDiv: boolean;
  

  constructor(
    public ref: DynamicDialogRef,
    private questionnaireService: QuestionnaireService,
    private questionnaireQuestionService: QuestionnaireQuestionService,
    private translate: TranslateService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute,
    public datepipe: DatePipe,
    private router: Router,
    public config: DynamicDialogConfig,
  ) {
    this.slots = [
      {value: this.translate.instant('MOR'), code: 'MOR'},
      {value: this.translate.instant('AFT'), code: 'AFT'},
      {value: this.translate.instant('EVE'), code: 'EVE'},
    ];
  }

  ngOnInit(): void {
    this.questionObj = Object.assign({ question: Question }, this.config.data.question);
    this.showAlert();
    this.chargeListOfAnswersTypeValue();
    this.getWeekDays();
    
  }
  chargeListOfAnswersTypeValue() {
    this.questionnaireService.getAnswersByDescription(this.questionObj.answerType.description).subscribe(answersTypeArray=>{
      this.answersByType = answersTypeArray;
      this.translateAnswers();
    })
    
  }
  

  translateAnswers() {
    const translatedAnswers = [];
    for (let i = 0; i < this.answersByType.length; i++) {
      const answer = this.answersByType[i];
      this.translate.get(answer.value).subscribe(translated => {
        translatedAnswers.push({label: translated, value: answer});
      });
    }
    this.answersByType = translatedAnswers;
    
  }
  
  toggleShowDiv(): void {
    this.showDiv = !this.showDiv;
  }
  

  showAlert() {
    let answerType = this.questionObj.answerType.description;
    const wordsAnswerType = answerType.split('.');
    const type = wordsAnswerType[1];
    if(type != "numeric"){
      this.checkAlert = true;
    }
  }

  displayToSelect(questionnaireQuestionObj: QuestionnaireQuestion) {
    if(this.showDiv == false){
      questionnaireQuestionObj.alertConfigAnswerType = null;
      questionnaireQuestionObj.alertConfigConsecutiveAnswers = null;
    }
    for (const weekDayE of questionnaireQuestionObj.weekDays) {
      let weekDay = new WeekDay();
      weekDay.id = weekDayE.id;
      weekDay.code = weekDayE.code;
      this.newwD.push(weekDay);
    }
    if(!questionnaireQuestionObj.alertConfigConsecutiveAnswers){
      const newQuestionnaireQuestion = new QuestionnaireQuestion(
        questionnaireQuestionObj.questionnaire, 
        this.questionObj, 
        questionnaireQuestionObj.timeslot, 
        this.newwD,
      );
      this.allQuestionnairesSelected.push(newQuestionnaireQuestion);
      
    }else{
      const newQuestionnaireQuestion = new QuestionnaireQuestion(
        questionnaireQuestionObj.questionnaire, 
        this.questionObj, 
        questionnaireQuestionObj.timeslot, 
        this.newwD,
        questionnaireQuestionObj.alertConfigAnswerType, 
        questionnaireQuestionObj.alertConfigConsecutiveAnswers
      );
      this.allQuestionnairesSelected.push(newQuestionnaireQuestion);
    }
    this.ref.close(this.allQuestionnairesSelected);
  }
  
  

  getAllQuestionnairesSelected(){
    return this.allQuestionnairesSelected;
  }

  getWeekDays(){
    this.questionnaireQuestionService.getWeekDays().subscribe({
      next: (res) => {
        this.weekDays = res
      }
    });
  }

  translateWeekDays() {
    const translatedWeekDays = [];
    for (let i = 0; i < this.weekDays.length; i++) {
      const dayWeek = this.weekDays[i].code;
      this.translate.get(dayWeek).subscribe(translated => {
        translatedWeekDays.push({label: translated, value: dayWeek});
      });
    }
   this.weekDays = translatedWeekDays;
  }

  onClose() {
    this.ref.close(this.allQuestionnairesSelected);
  }

}