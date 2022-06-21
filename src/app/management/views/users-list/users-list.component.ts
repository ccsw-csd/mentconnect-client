import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Pageable } from 'src/app/core/models/Pageable';
import { User } from 'src/app/management/models/User';
import { UserService } from 'src/app/management/services/users/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  pageNumber: number = 0;
  pageSize: number = 5;
  property: string = 'id';
  direction: string = 'ASC';
  
  totalRecords: number;
  users: User[];
  loading: boolean = true;

  constructor(
    private userservice: UserService
  ) { }

  ngOnInit(): void {
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
        pageable.sort = [{property:event.sortField, direction:event.sortOrder == 1 ? 'asc':'desc'}];
      }

      this.userservice.findPage(pageable, event.filters?.id?.value, event.filters?.username?.value, event.filters?.name?.value, event.filters?.surnames?.value, event.filters?.email?.value).subscribe(data => {
        this.users = data.content;
        this.pageNumber = data.pageable.pageNumber;
        this.pageSize = data.pageable.pageSize;
        this.totalRecords = data.totalElements;
        this.loading = false;
      });
    }
  }
}
