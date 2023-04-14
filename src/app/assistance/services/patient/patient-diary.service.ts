import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Diary } from 'src/app/assistance/models/Diary';

@Injectable({
  providedIn: 'root'
})
export class PatientDiaryService {

  constructor(
    private http: HttpClient,
  ) { }

  findDiaryPatientById(patientId: number): Observable<Diary[]> {
    return this.http.get<Diary[]>(environment.server + '/diary/' + patientId);
  }
}
