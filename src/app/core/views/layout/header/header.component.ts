import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UserDetailsJWT } from '../../../models/UserDetailsJWT';
import { DialogService } from 'primeng/dynamicdialog';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user : UserDetailsJWT | null = null;
  navOpen = true;
  isloading : boolean = false;
  @Output() navOpenEvent = new EventEmitter();

  constructor(
    public auth: AuthService,
    public dialog: DialogService
  ) { }

  ngOnInit(): void {
    this.user = this.auth.getUserInfo();
  }

  toggleSideNav() {
    this.navOpen = !this.navOpen;
    this.navOpenEvent.emit(this.navOpen);
  }


}
