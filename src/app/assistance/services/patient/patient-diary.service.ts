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

  filterDiary(patientId: number, startDate? : Date, endDate?: Date) : Observable<Diary[]> {
    let data = {
      patientId: patientId != null ? patientId : null, 
      startDate: startDate != null ? startDate : null, 
      endDate: endDate != null ? endDate : null
    };
    return this.http.post<Diary[]>(environment.server+ '/diary/filter/', data);
  }


}
