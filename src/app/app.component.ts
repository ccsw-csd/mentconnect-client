import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
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
    private translateService: TranslateService, 
    private roleService: RoleService)
  {}

  ngOnInit(): void {
    this.translateService.get('primeng').subscribe(res => this.config.setTranslation(res));
    
    this.roleService.findRoles().subscribe((roles => {
      sessionStorage.setItem("roles", JSON.stringify(roles));
    }));
  }
}
