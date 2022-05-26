import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Patient } from '../../models/Patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(
    private http: HttpClient,
  ) { }

  registerPatient(patient: Patient) : Observable<any>{
    return this.http.put(environment.server+ '/patientDischarge/register', patient);
  }
}
