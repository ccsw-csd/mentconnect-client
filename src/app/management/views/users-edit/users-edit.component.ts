import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Role } from 'src/app/assistance/models/Role';
import { RoleService } from 'src/app/core/services/role.service';
import { User } from '../../models/User';
import { UserFull } from '../../models/UserFull';
import { UserService } from '../../services/users/services/user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss'],
  providers: [MessageService]
})
export class UsersEditComponent implements OnInit {

  user: User;
  userFull: UserFull = new UserFull();
  roles: Role[] = [];

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private translate: TranslateService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.user = Object.assign({user: User}, this.config.data.user);
    this.roleService.findRoles().subscribe(rolesArray =>
      this.roles = [...this.roles,...rolesArray]
    );
    this.getUserFull(this.user.id);
  }

  getUserFull(id: number){
    this.userService.userFull(id).subscribe({
      next: (res) => {
        this.userFull = res
      }
    });
  }

  onSave(user: UserFull){
    this.userService.modifyUser(user.id, user.username, user.name, user.surnames, user.email, user.roles).subscribe({
      next: () => {
        this.onClose();
        this.messageService.add({key: 'usersMessage', severity:'success', summary: this.translate.instant('user.form.usersMessage.success.title'), detail: this.translate.instant('user.form.usersMessage.success.detail')});
      },
      error: () => {
        this.messageService.add({key: 'usersMessage', severity:'error', summary: this.translate.instant('user.form.usersMessage.error.title'), detail: this.translate.instant('user.form.usersMessage.error.detail')});
      }
    });
  }

  onClose(){
    this.ref.close();
  }

}
