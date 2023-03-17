import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { QuestionnairePatient } from '../model/QuestionnairePatient';

@Injectable({
  providedIn: 'root'
})
export class QuestionnairePatientService {
  
  constructor(
    private http: HttpClient
  ) { }

  findQuestionnairesPatient() : Observable<QuestionnairePatient[]> {
    return this.http.get<QuestionnairePatient[]>(environment.server + '/questionnaire_patient/findAll');
  }

  findQuestionnairesPatientById(id: number) : Observable<QuestionnairePatient[]> {
    return this.http.get<QuestionnairePatient[]>(environment.server + '/questionnaire_patient/'+id);
  }

  assignQuestionnairePatient(questionnairePatient: QuestionnairePatient) : Observable<QuestionnairePatient>{
    return this.http.post<QuestionnairePatient>(environment.server+ '/questionnaire_patient/', questionnairePatient);
  }

  deleteQuestionnairePatient(id: number):Observable<QuestionnairePatient>{
    return this.http.delete<QuestionnairePatient>(environment.server+'/questionnaire_patient/'+id);
  }
}
