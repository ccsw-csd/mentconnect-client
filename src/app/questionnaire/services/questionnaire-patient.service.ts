import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Questionnaire } from '../model/Questionnaire';
import { QuestionnairePatient } from '../model/QuestionnairePatient';

@Injectable({
  providedIn: 'root'
})
export class QuestionnairePatientService {

  constructor(
    private http: HttpClient,
    public datepipe: DatePipe
  ) { }

  findQuestionnairesPatient(): Observable<QuestionnairePatient[]> {
    return this.http.get<QuestionnairePatient[]>(environment.server + '/questionnaire-patient/findAll');
  }

  findQuestionnairesPatientById(patientId: number): Observable<QuestionnairePatient[]> {
    return this.http.get<QuestionnairePatient[]>(environment.server + '/questionnaire-patient/' + patientId);
  }

  assignQuestionnairePatient(questionnairePatient: QuestionnairePatient): Observable<QuestionnairePatient> {
    return this.http.post<QuestionnairePatient>(environment.server + '/questionnaire-patient/', questionnairePatient);
  }

  deleteQuestionnairePatient(id: number): Observable<QuestionnairePatient> {
    return this.http.delete<QuestionnairePatient>(environment.server + '/questionnaire-patient/' + id);
  }

  questionnaireAssigned(questionnairePatient: QuestionnairePatient): Observable<QuestionnairePatient> {
    return this.http.post<QuestionnairePatient>(environment.server + '/questionnaire-patient/check-questionnaire-assignable/', questionnairePatient);
  }

  questionnaireAvailable(patientId: number): Observable<Questionnaire[]> {
    return this.http.get<Questionnaire[]>(environment.server + '/questionnaire-patient/questionnaire-available/' + patientId);
  }
}
