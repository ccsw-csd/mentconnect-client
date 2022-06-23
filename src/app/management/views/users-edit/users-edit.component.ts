import { Component, OnInit } from '@angular/core';
import { DynamicDialogComponent, DynamicDialogRef } from 'primeng/dynamicdialog';
import { User } from '../../models/User';
import { UserService } from '../../services/users/services/user.service';


@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss']
})


export class UsersEditComponent implements OnInit {
  displayEditDialog: boolean = false;

  user: User;

  constructor(

  public userService: UserService,
  public ref: DynamicDialogRef
  ) { }

  ngOnInit(): void {
    
  }

  modify(){
    this.userService.modifyUser(this.user.id,this.user.username,this.user.name,this.user.surnames
      ,this.user.email).subscribe(user =>{
      this.ref.close();
    });
  }
  onClose(){
    this.ref.close();
  }
  showEditDialog() {
    command: () => this.showEditDialog();
    this.displayEditDialog = true;
  }
}
