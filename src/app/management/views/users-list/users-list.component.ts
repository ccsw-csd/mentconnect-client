import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Pageable } from 'src/app/core/models/Pageable';
import { User } from 'src/app/management/models/User';
import { UserService } from 'src/app/management/services/users/services/user.service';
import { UsersEditComponent } from '../users-edit/users-edit.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  providers: [DialogService, DynamicDialogRef, MessageService]
})
export class UsersListComponent implements OnInit {

  pageNumber: number = 0;
  pageSize: number = 5;
  property: string = 'id';
  direction: string = 'ASC';
  
  totalRecords: number;
  users: User[];
  loading: boolean = true;
  lastTableLazyLoadEvent: LazyLoadEvent;

  constructor(private userservice: UserService,
    private dialogService: DialogService,
    private ref: DynamicDialogRef
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
      this.lastTableLazyLoadEvent = event;
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

  editUser(user: User){
    this.ref = this.dialogService.open(UsersEditComponent, {
      header: 'Editar ' + user.name,
      width: '40%',
      data: {
        user: user, loading: this.loading,
        lastTableLazyLoadEvent: this.lastTableLazyLoadEvent
      },
      closable: false
    });

    this.ref.onClose.subscribe(res =>{
      this.loadPage(this.lastTableLazyLoadEvent);
    });
  }
  
}
