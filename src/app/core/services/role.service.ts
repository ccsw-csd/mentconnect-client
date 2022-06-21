import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Role } from 'src/app/assistance/models/Role';

@Injectable({
    providedIn: 'root'
  })
  export class RoleService {
  
    constructor(
      private http: HttpClient,
    ) { }
  
    findRoles() : Observable<Role[]> {
      return this.http.get<Role[]>(environment.server+ '/role/findAll');
    }
}