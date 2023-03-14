import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pageable } from 'src/app/core/models/Pageable';
import { User } from 'src/app/management/models/User';
import { environment } from 'src/environments/environment';
import { Questionnaire } from '../model/Questionnaire';
import { QuestionnairePage } from '../model/QuestionnairePage';

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

  findQuestionnaires() : Observable<Questionnaire[]> {
    return this.http.get<Questionnaire[]>(environment.server+ '/questionnaire/findAll');
  }


}
