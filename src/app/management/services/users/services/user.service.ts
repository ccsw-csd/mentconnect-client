import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pageable } from 'src/app/core/models/Pageable';
import { UserPage } from 'src/app/management/models/UserPage';
import { UserFull } from 'src/app/management/models/UserFull';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  findPage(pageable: Pageable, id?:number, username?:string, name?:string, surnames?:string, email?:string): Observable<UserPage>{
    return this.http.post<UserPage>(environment.server + "/user/findPage", {id:id, username:username, name:name, surnames:surnames, email:email, pageable:pageable});
  }

  modifyUser(id?:number, username?:string, name?:string, surnames?:string, email?:string, rolesid?:number, rolescode?:string, rolestype?:string): Observable<UserFull>{
    return this.http.put<UserFull>(environment.server + "/user", {id:id, username:username, name:name, surnames:surnames, email:email, roles:[{id: rolesid, code: rolescode, type: rolestype}]});
  }

  userFull(id: number): Observable<UserFull>{
    return this.http.get<UserFull>(environment.server + "/user/full/" + id);
  }

}
