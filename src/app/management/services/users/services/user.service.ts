import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pageable } from 'src/app/core/models/Pageable';
import { UserPage } from 'src/app/management/models/UserPage';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient){}



  findPage(pageable: Pageable, id?:number, username?:string, name?:string, surnames?:string, email?:string): Observable<UserPage>{
    return this.http.post<UserPage>(environment.server + "/user/findPage", {id:id, username:username, name:name, surnames:surnames, email:email, pageable:pageable});
  }

}
