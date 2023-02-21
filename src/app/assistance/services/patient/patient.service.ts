import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Patient } from '../../models/Patient';
import { PatientFull } from '../../models/PatientFull';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(
    private http: HttpClient,
  ) { }

  findAllPatients() : Observable<Patient[]>{
    return this.http.get<Patient[]>(environment.server+ '/patient/findAll');
  }

  registerPatient(patient: PatientFull) : Observable<PatientFull>{
    return this.http.post<PatientFull>(environment.server+ '/patient', patient);
  }
}
