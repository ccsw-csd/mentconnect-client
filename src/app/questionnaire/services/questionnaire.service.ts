import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pageable } from 'src/app/core/models/Pageable';
import { User } from 'src/app/core/models/User';
import { environment } from 'src/environments/environment';
import { Questionnaire } from '../model/Questionnaire';
import { QuestionnairePage } from '../model/QuestionnairePage';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {

  url: string = environment.server+'/questionnaire/findPage'

  constructor(
    private http: HttpClient
  ) { }

  private composeFindUrl(description?:string, questionsNumber?:number, patientsNumber?:number, user?:User){
    let params = '';

    if(description != null){
      params += "description="+description;
    }

    if(questionsNumber != null){
      if(params != '') params + "&";
      params += "questionsNumber="+questionsNumber;
    }

    if(patientsNumber != null){
      if(params != '') params + "&";
      params += "patientsNumber="+patientsNumber;
    }

    if(user != null){
      if(params != '') params + "&";
      params += "user="+user;
    }

    if(params == ''){
      return this.url;
    }else{
      return this.url + '?'+params;
      }
  }

  getQuestionnaires(pageable: Pageable, description?:string, questionsNumber?:number, patientsNumber?:number, user?:User): Observable<QuestionnairePage>{
    return this.http.post<QuestionnairePage>(this.composeFindUrl(description, questionsNumber, patientsNumber, user),{pageable:pageable, description, questionsNumber, patientsNumber, user});
  }


}
