import { Component, OnInit } from '@angular/core';
import {UserList} from 'src/app/management/models/UserList';
import { UserService } from 'src/app/management/services/users/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {


  cols : any[];
  users: UserList[];
  constructor(private userservice: UserService) { }

  getAll(){
   // this.userservice.findAll().subscribe(data => this.users = data);
 this.userservice.findAll().subscribe(
   (result: any) => {
    let users : UserList[] = [];
    for (let i = 0; i < result.length; i ++){
      let user = result [i] as UserList;
      users.push(user);
    }
    this.users =users;
   });
  }
  ngOnInit() {
  this.getAll();
  this.cols = [
    { field :"id" , header:"ID"},
    { field: "username", header: "Username"} ,
    { field: "name", header: "Name"} ,
    { field: "surnames", header: "Surnames"}  ,
    { field: "email", header: "Email"} ,
    

  ];
  }

}
