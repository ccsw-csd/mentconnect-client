import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
baseUrl: string = "http://localhost:8080/user"
  constructor(
    private http: HttpClient){}

      findAll(): Observable<any> {
        return this.http.get(this.baseUrl+"/findAll");
        
      }
   
}
