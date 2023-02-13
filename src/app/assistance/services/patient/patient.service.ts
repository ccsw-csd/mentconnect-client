import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PatientFull } from '../../models/PatientFull';
import { Pageable } from 'src/app/core/models/Pageable';
import { PatientPage } from '../../models/PatientPage';

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

  findPage(pageable: Pageable, nif?:number, name?:string, surnames?:string, gender?:string, age?:number, email?:string, phone?:string, sip?: string, medicalHistory?: string): Observable<PatientPage>{
    return this.http.post<PatientPage>(environment.server + "/patient/findPage", {nif:nif, name:name, surnames:surnames, gender:gender, age:age, email:email, phone:phone, sip:sip, medicalHistory:medicalHistory, pageable:pageable});
  }

  userFull(id: number): Observable<PatientFull>{
    return this.http.get<PatientFull>(environment.server + "/patient/full/" + id);
  }
}