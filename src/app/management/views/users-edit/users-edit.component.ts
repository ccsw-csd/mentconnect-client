import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Role } from 'src/app/management/models/Role';
import { RoleService } from 'src/app/core/services/role.service';
import { User } from '../../models/User';
import { UserFull } from '../../models/UserFull';
import { UserService } from '../../services/users/services/user.service';
import { MessageService } from 'primeng/api';
import { Patient } from '../../../assistance/models/Patient';
import { PatientService } from '../../../assistance/services/patient/patient.service';

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
  patients: Patient[] = [];
  stuffRole: boolean;

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private patientService:PatientService,
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
    this.patientService.findAllPatients().subscribe(
      patientsArray => this.patients = patientsArray
    );
    this.getUserFull(this.user.id);
    
  }

  getUserFull(id: number){
    this.userService.userFull(id).subscribe({
      next: (res) => {
        this.userFull = res;
        this.checkRole(this.userFull.roles);
      }
    });
  }

  changeRole(event,roles) {
    this.checkRole(roles);
  }

  checkRole(roles){
    const checkStuffRole = role => roles.some( ({code}) => code == role)
    if (checkStuffRole("STAFF")){
      this.stuffRole = true;
    }else{
      this.stuffRole = false;
    }
  }

  onSave(user: UserFull){
    this.userService.modifyUser(user).subscribe({
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
