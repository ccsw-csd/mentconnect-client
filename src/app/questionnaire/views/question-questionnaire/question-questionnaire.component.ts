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
  constructor(
    public ref: DynamicDialogRef,
    private questionnaireService: QuestionnaireService,
    private translate: TranslateService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute,
    public datepipe: DatePipe,
    private router: Router,
    public config: DynamicDialogConfig,
  ) {
    this.slots = [
      {value: 'Morning', code: 'M'},
      {value: 'Afternoon', code: 'A'},
      {value: 'Evening', code: 'E'},
    ];
  }

  ngOnInit(): void {
    this.questionObj = Object.assign({ question: Question }, this.config.data.question);
    this.showAlert();
    this.chargeListOfAnswersTypeValue();
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
      const answer = this.answersByType[i].value;
      this.translate.get(answer).subscribe(translated => {
        translatedAnswers.push({label: translated, value: answer});
      });
    }
    this.answersByType = translatedAnswers;
  }

  showAlert() {
    let answerType = this.questionObj.answerType.description;
    const wordsAnswerType = answerType.split('.');
    const type = wordsAnswerType[1];
    if(type != "numeric"){
      this.checkAlert = true;
    }
  }

  // getSelectedDays(): string[] {
  //   return this.selectedDays.filter(day => day !== null && day !== undefined && day !== '');
  // }

  // guardarSlotSeleccionado() {
  //   if (this.slots.indexOf(this.selectedSlot) === -1) {
  //     this.slots.push(this.selectedSlot);
  //   }
  // }

  // displayToAssign(rangeDates: Date[]) {
  //   let startDate = rangeDates[0];
  //   let endDate = rangeDates[1];
  //   this.questionnairePatientObj = new QuestionnairePatient(this.questionnaireObj, this.patientObj, this.parsetoIsoDate(startDate), this.parsetoIsoDate(endDate));
  //   this.isloading = true;
  //   this.questionnairePatientService.questionnaireAssigned(this.questionnairePatientObj).subscribe(result => {
  //     if (!result) {
  //       this.questionnairePatientService.assignQuestionnairePatient(this.questionnairePatientObj).subscribe({
  //         next: (res: QuestionnairePatient) => {
  //           this.isloading = false;
  //           this.onClose();
  //           this.route.params.subscribe(params => {
  //             this.router.navigate(['patient-evaluation/' + params['id']])
  //           });

  //           this.messageService.add({ key: 'patientAssignOkMessage', severity: 'success', summary: this.translate.instant('patientEvaluation.questionnaireAssignedMessage.success.title'), detail: this.translate.instant('patientEvaluation.questionnaireAssignedMessage.success.detail') });
  //         },
  //         error: (err: any) => {
  //           this.isloading = false;
  //           this.messageService.add({ key: 'patientAssignMessage', severity: 'error', summary: this.translate.instant('patientEvaluation.questionnaireAssignedMessage.error.title'), detail: this.translate.instant('patientEvaluation.questionnaireAssignedMessage.error.detail') });
  //         }
  //       });
  //     } else {
  //       this.messageService.add({ key: 'patientAssignMessage', severity: 'error', summary: this.translate.instant('patientEvaluation.questionnaireAssignedMessage.error.title'), detail: this.translate.instant('patientEvaluation.questionnaireAssignedMessage.error.range') });
  //     }
  //   })
  // }

  // showRange(event, mc) {
  //   this.rangeDatesSelected = mc.inputFieldValue;
  // }

  onClose() {
    this.ref.close();
  }

  // parsetoIsoDate(date): Date {
  //   let tDate = new Date(date);
  //   tDate.setMinutes(tDate.getMinutes() - tDate.getTimezoneOffset());
  //   return tDate;
  // }

}