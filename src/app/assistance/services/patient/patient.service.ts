import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PatientFull } from '../../models/PatientFull';
import { Pageable } from 'src/app/core/models/Pageable';
import { PatientPage } from '../../models/PatientPage';
import { Patient } from '../../models/Patient';
import { User } from 'src/app/management/models/User';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(
    private http: HttpClient,
  ) { }

  registerPatient(patient: PatientFull) : Observable<PatientFull>{
    return this.http.post<PatientFull>(environment.server+ '/patient', patient);
  }

  findPage(pageable: Pageable, nif?:number, user?:User, gender?:string, phone?:string, sip?: string, medicalHistory?: string): Observable<PatientPage>{
    return this.http.post<PatientPage>(environment.server + "/patient/findPage", {nif:nif, user:user, gender:gender, phone:phone, sip:sip, medicalHistory:medicalHistory, pageable:pageable});
  }
  

  userFull(id: number): Observable<PatientFull>{
    return this.http.get<PatientFull>(environment.server + "/patient/full/" + id);
  }


  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(environment.server + '/patient/findAll');
  }
}