import { Component, OnInit,OnChanges } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Pageable } from 'src/app/core/models/Pageable';
import {UserList} from 'src/app/management/models/UserList';
import { UserService } from 'src/app/management/services/users/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  pageNumber : number = 0;
  pageSize: number = 5;
  totalElements: number =0;

  property : string ='id';
  direction: string ='ASC';
  
  loading:boolean;
  totalRecords: number;

  cols : any[];
  users: UserList[];

  constructor(private userservice: UserService
    ) { }

  
  getAll(){
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

  loadPage(event?:LazyLoadEvent){
    this.loading = true;

    let pageable: Pageable = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sort: [{
        property: this.property,
        direction: this.direction
      }]
    }

    if(event != null){
      pageable.pageSize = event.rows;
      pageable.pageNumber = event.first / event.rows;

      if (event.sortField != null){
        pageable.sort = [{property:event.sortField, direction:event.sortOrder ==1 ? 'asc':'desc'}];
      }
      this.userservice.findPage(pageable,event.filters?.id?.value,event.filters?.username?.value,event.filters?.name?.value,event.filters?.surnames?.value,event.filters?.email?.value).subscribe(data =>{
        this.users = data.content;
        this.pageNumber = data.pageable.pageNumber;
        this.pageSize = data.pageable.pageSize;
        this.totalRecords = data.totalElements;
        this.loading = false;
      });
    }
  }

  
  ngOnInit() : void {
  this.getAll();

  this.loadPage();

  }

}
