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

@Component({
  selector: 'app-question-questionnaire',
  templateUrl: './question-questionnaire.component.html',
  styleUrls: ['./question-questionnaire.component.scss']
})
export class QuestionQuestionnaireComponent implements OnInit {
  isloading: boolean = false;
  questionnairePatientObj: QuestionnairePatient;
  questionObj: Question;
  questionnaireAssigned: boolean;
  rangeDates: Date[];
  rangeDatesSelected: Date[];
  question: QuestionnaireNewComponent;
  selectedValue: string = 'value1';
  constructor(
    public ref: DynamicDialogRef,
    private questionnairePatientService: QuestionnairePatientService,
    private translate: TranslateService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute,
    public datepipe: DatePipe,
    private router: Router,
    public config: DynamicDialogConfig,
  ) {
  }

  ngOnInit(): void {
    this.questionObj = Object.assign({ question: Question }, this.config.data.question);
    //this.questionnairePatientObj = new QuestionnairePatient(new Questionnaire(), new Patient(), null, null);
  }

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