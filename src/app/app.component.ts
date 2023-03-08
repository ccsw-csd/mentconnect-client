import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from 'src/app/core/services/auth.service';
import { RoleService } from './core/services/role.service';

@Component({
  
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title : String = 'mentconnect-client';

  constructor( 
    private config: PrimeNGConfig, 
    private auth: AuthService,
    private translateService: TranslateService, 
    private roleService: RoleService)
  {}

  ngOnInit(): void {
    this.translateService.get('primeng').subscribe(res => this.config.setTranslation(res));
    if(this.auth.getToken() != null){
      this.roleService.findRoles().subscribe((roles => {
        sessionStorage.setItem("roles", JSON.stringify(roles));
      }));
    }

  }
}
