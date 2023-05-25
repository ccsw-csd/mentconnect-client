import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pageable } from 'src/app/core/models/Pageable';
import { User } from 'src/app/management/models/User';
import { environment } from 'src/environments/environment';
import { QuestionnairePage } from '../model/QuestionnairePage';
import { AnswerTypeValue } from '../model/AnswerTypeValue';
import { Questionnaire } from '../model/Questionnaire';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {

  url: string = environment.server + '/questionnaire/findPage'

  constructor(
    private http: HttpClient
  ) { }

  getQuestionnaires(pageable: Pageable, description?: string, questionsNumber?: number, patientsNumber?: number, user?: User): Observable<QuestionnairePage> {
    return this.http.post<QuestionnairePage>(this.url, { description: description, questionsNumber: questionsNumber, patientsNumber: patientsNumber, user: user, pageable: pageable });
  }

  getAnswersByDescription(description: string): Observable<AnswerTypeValue[]> {
    return this.http.get<AnswerTypeValue[]>(environment.server + '/answer-type-value/findByAnswerTypeDescription?description=' + description);
  }
  saveQuestionnaire(questionnaire: Questionnaire): Observable<Questionnaire> {
    return this.http.post<Questionnaire>(environment.server + '/questionnaire/', questionnaire);
  }

  getQuestionnaire(id: number): Observable<Questionnaire>{
    return this.http.get<Questionnaire>(environment.server + "/questionnaire/" + id);
  }
}
