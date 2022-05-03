import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    public auth: AuthService, 
    public router: Router
    ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    if (this.auth.isTokenValid() == false) {
      this.auth.logout();
      return false;
    }

    if(route.data.roles != null && !this.auth.hasRole(route.data.roles)){
      this.auth.logout();
      return false;
    }
    
    if (route.routeConfig != null && route.routeConfig.path != null && route.routeConfig.path.includes('login')){
      this.router.navigate(['welcome']);
    }
    
    return true;
  }
}
