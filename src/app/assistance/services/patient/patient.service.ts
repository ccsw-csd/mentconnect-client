import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Patient } from '../../models/Patient';
import { PatientFull } from '../../models/PatientFull';
import { Pageable } from 'src/app/core/models/Pageable';
import { PatientPage } from '../../models/PatientPage';
import { User } from 'src/app/management/models/User';

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

  findPage(pageable: Pageable, nif?:number, user?:User, gender?:string, phone?:string, sip?: string, medicalHistory?: string,dateBirth?:Date): Observable<PatientPage>{
    return this.http.post<PatientPage>(environment.server + "/patient/findPage", {nif:nif, user:user, gender:gender, phone:phone, sip:sip, medicalHistory:medicalHistory, dateBirth:dateBirth, pageable:pageable});
  }
  
  patientFull(id: number): Observable<PatientFull>{
    return this.http.get<PatientFull>(environment.server + "/patient/" + id);
  }

  modifyPatient(id?:number, nif?:string, user?:User, gender?:string, phone?:string, sip?: string, medicalHistory?: string,dateBirth?:Date): Observable<PatientFull>{
    return this.http.put<PatientFull>(environment.server + "/patient/", {id:id, nif:nif, user:user, gender:gender, phone:phone, sip:sip, medicalHistory:medicalHistory, dateBirth:dateBirth});
  }
}