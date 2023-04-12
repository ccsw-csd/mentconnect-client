import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PatientFull } from '../../models/PatientFull';
import { PatientService } from '../../services/patient/patient.service';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Questionnaire } from 'src/app/questionnaire/model/Questionnaire';
import { QuestionnairePatient } from 'src/app/questionnaire/model/QuestionnairePatient';
import { Patient } from '../../models/Patient';
import { QuestionnairePatientService } from 'src/app/questionnaire/services/questionnaire-patient.service';
import { PatientEvaluationComponent } from '../patient-evaluation/patient-evaluation.component';

@Component({
  selector: 'app-patient-questionnaire',
  templateUrl: './patient-questionnaire.component.html',
  styleUrls: ['./patient-questionnaire.component.scss']
})
export class PatientQuestionnaireComponent implements OnInit {
  isloading: boolean = false;
  questionnairePatientObj: QuestionnairePatient;
  patientObj: PatientFull;
  questionnaireObj: Questionnaire;
  questionnaireAssigned: boolean;
  rangeDates: Date[];
  rangeDatesSelected: Date[];
  patientEvaluation: PatientEvaluationComponent;
  constructor(
    public ref: DynamicDialogRef,
    private questionnairePatientService: QuestionnairePatientService,
    private patientService: PatientService,
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
    this.questionnaireObj = Object.assign({ questionnaire: Questionnaire }, this.config.data.questionnaire);
    this.patientObj = Object.assign({ patient: Patient }, this.config.data.patient);
    this.questionnairePatientObj = new QuestionnairePatient(new Questionnaire(), new Patient(), null, null);
  }

  displayToAssign(rangeDates: Date[]) {
    let startDate = rangeDates[0];
    let endDate = rangeDates[1];
    this.questionnairePatientObj = new QuestionnairePatient(this.questionnaireObj, this.patientObj, this.parsetoIsoDate(startDate), this.parsetoIsoDate(endDate));
    this.isloading = true;
    this.questionnairePatientService.questionnaireAssigned(this.questionnairePatientObj).subscribe(result => {
      if (!result) {
        this.questionnairePatientService.assignQuestionnairePatient(this.questionnairePatientObj).subscribe({
          next: (res: QuestionnairePatient) => {
            this.isloading = false;
            this.onClose();
            this.route.params.subscribe(params => {
              this.router.navigate(['patient-evaluation/' + params['id']])
            });

            this.messageService.add({ key: 'patientAssignOkMessage', severity: 'success', summary: this.translate.instant('patientEvaluation.questionnaireAssignedMessage.success.title'), detail: this.translate.instant('patientEvaluation.questionnaireAssignedMessage.success.detail') });
          },
          error: (err: any) => {
            this.isloading = false;
            this.messageService.add({ key: 'patientAssignMessage', severity: 'error', summary: this.translate.instant('patientEvaluation.questionnaireAssignedMessage.error.title'), detail: this.translate.instant('patientEvaluation.questionnaireAssignedMessage.error.detail') });
          }
        });
      } else {
        this.messageService.add({ key: 'patientAssignMessage', severity: 'error', summary: this.translate.instant('patientEvaluation.questionnaireAssignedMessage.error.title'), detail: this.translate.instant('patientEvaluation.questionnaireAssignedMessage.error.range') });
      }
    })
  }

  showRange(event, mc) {
    this.rangeDatesSelected = mc.inputFieldValue;
  }

  onClose() {
    this.ref.close();
  }

  parsetoIsoDate(date): Date {
    let tDate = new Date(date);
    tDate.setMinutes(tDate.getMinutes() - tDate.getTimezoneOffset());
    return tDate;
  }

}