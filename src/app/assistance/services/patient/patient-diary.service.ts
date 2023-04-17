import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Diary } from 'src/app/assistance/models/Diary';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PatientDiaryService {

  constructor(
    private http: HttpClient,
    public datepipe: DatePipe
  ) { }

  findDiaryPatientById(patientId: number): Observable<Diary[]> {
    return this.http.get<Diary[]>(environment.server + '/diary/' + patientId);
  }


  filterDiary(startDate? : Date, endDate?: Date) : Observable<Diary[]> {
    let data = {
      startDate: startDate != null ? startDate : null, 
      endDate: endDate != null ? endDate : null
    };
    return this.http.post<Diary[]>(environment.server+ '/diary/filter/', data);
  }


}
