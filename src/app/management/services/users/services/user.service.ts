import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pageable } from 'src/app/core/models/Pageable';
import { User } from 'src/app/core/models/User';
import { UserList } from 'src/app/management/models/UserList';
import { UserPage } from 'src/app/management/models/UserPage';

@Injectable({
  providedIn: 'root'
})
export class UserService {
baseUrl: string = "http://localhost:8080/user"
  constructor(
    private http: HttpClient){}

      findAll(): Observable<User[]> {
        return this.http.get<User[]>(this.baseUrl+"/findAll");
        
      }

      findPage(pageable: Pageable, id?:number,username?:string,name?:string,surnames?:string,email?:string,user?:UserList): Observable<UserPage>{
        return this.http.post<UserPage>(this.baseUrl+"/findPage", {id:id,username:username,name:name,surnames:surnames,email:email, user: user, pageable:pageable});
      }
   
}
