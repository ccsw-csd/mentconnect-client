import { Component, OnInit } from '@angular/core';
import { RoleService } from './core/services/role.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title : String = 'mentconnect-client';

  constructor( private roleService: RoleService)
  {}

  ngOnInit(): void{
    this.roleService.findRoles().subscribe((roles => {
      sessionStorage.setItem("roles", JSON.stringify(roles));
    }));
  }
}
