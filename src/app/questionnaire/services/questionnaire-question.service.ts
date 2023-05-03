import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Questionnaire } from '../model/Questionnaire';
import { QuestionnairePatient } from '../model/QuestionnairePatient';
import { QuestionnaireQuestion } from '../model/QuestionnaireQuestion';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireQuestionService {

  constructor(
    private http: HttpClient,
    public datepipe: DatePipe
  ) { }

  saveQuestionnaireQuestions(questionnaireQuestions: QuestionnaireQuestion[]): Observable<QuestionnaireQuestion[]> {
    return this.http.post<QuestionnaireQuestion[]>(environment.server + '/questionnaire-question/', questionnaireQuestions);
  }

}
