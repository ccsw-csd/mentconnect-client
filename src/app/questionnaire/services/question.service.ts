import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pageable } from 'src/app/core/models/Pageable';
import { User } from 'src/app/management/models/User';
import { environment } from 'src/environments/environment';
import { QuestionnairePage } from '../model/QuestionnairePage';
import { Question } from '../model/Question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  url: string = environment.server + '/question/findAll'

  constructor(
    private http: HttpClient
  ) { }


  findAllQuestions() : Observable<Question[]>{
    return this.http.get<Question[]>(environment.server+ '/question/findAll');
  }
}
