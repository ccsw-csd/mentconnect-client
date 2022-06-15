import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ResponseCredentials } from '../models/ResponseCredentials';
import { Role } from '../models/Role';
import { UserDetailsJWT } from '../models/UserDetailsJWT';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  credentials : ResponseCredentials | undefined;
  token : string | null = null;
  user: UserDetailsJWT | null = null;

  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router
  ) { }

  putTokenCredentials(res: ResponseCredentials) : void {
    localStorage.setItem('credentials', JSON.stringify(res));
    this.putUserInfo(this.jwtHelper.decodeToken(res.accessToken));
  }

  putUserInfo(user: UserDetailsJWT) {
    this.user = user;
  }

  getTokenCredentials() : ResponseCredentials | null {
    
    if (this.credentials == undefined) {
      let json = localStorage.getItem('credentials');

      if (json != null)
        this.credentials = JSON.parse(json);
    }

    if (this.credentials == undefined) return null;
    
    return this.credentials;
  }

  getToken(): string | null {

    if (this.token == null) {
      let credentials = this.getTokenCredentials();
      if (credentials != null) {
        this.token = credentials.accessToken;
        this.putUserInfo(this.jwtHelper.decodeToken(this.token));
      }
    }

    return this.token;
  }

  public logout() {
    this.clearCredentials()
    this.router.navigateByUrl('login');
  }

  clearCredentials() {
    localStorage.removeItem('credentials');

    this.credentials = undefined;    
    this.token = null;
    this.user = null;
  }

  getUsername() : string | null {
    if (this.user == null) return null;
    return this.user.username;
  }

  isAdmin() : boolean {
    if (this.user == null || this.user.roleCode == null) return false;
    return this.user.roleCode.includes(Role.Admin);
  }

  isTokenValid() : boolean {
    let accessToken = this.getToken();
    if (accessToken == null) return false;

    return !this.jwtHelper.isTokenExpired(accessToken);
  }

  getUserInfo() : UserDetailsJWT | null {
    return this.user;
  }

  hasRole(roles : string[]){
    if (this.user == null || this.user.roleCode == null) return false;
    return this.user.roleCode.some(r => roles.includes(r)) || this.isAdmin();
  }
  
}
