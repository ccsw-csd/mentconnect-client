import { DatePipe } from '@angular/common';
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
    private http: HttpClient,
    public datepipe: DatePipe
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

  questionnaireAssigned(patientId:number, startDate: Date, endDate:Date):Observable<QuestionnairePatient[]>{
    return this.http.get<QuestionnairePatient[]>(this.composeFindUrl(patientId, startDate,endDate));
  }


  private composeFindUrl(patientId:number, startDate: Date, endDate: Date) : string {
    let params = '';
    if (params != '') params += "&";
    params += "patientId="+patientId;

    let startDateFormatted =this.datepipe.transform(startDate, 'MM-dd-yyyy');
    if (params != '') params += "&";
    params += "startDate="+startDateFormatted;

    let endDateFormatted =this.datepipe.transform(endDate, 'MM-dd-yyyy');
    if (params != '') params += "&";
    params += "endDate="+endDateFormatted;


    let url = environment.server + '/questionnaire_patient/questionnaire-assigned'

    return url  + '?' + params;
  }


}
