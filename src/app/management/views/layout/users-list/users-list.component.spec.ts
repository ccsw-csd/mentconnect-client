import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserPage } from 'src/app/management/models/UserPage';
import { UsersListComponent } from './users-list.component';

describe('UsersListComponent', () => {
let componentUserList : UsersListComponent
let mockUserService
let USERLIST


beforeEach(() => {
 USERLIST = [
    { id: 1, username: "dmin", name: "Admin", surnames: "Admin", email: "Admin" }
  ]

  mockUserService = jasmine.createSpyObj(["findAll","findPage"]);  
  componentUserList = new UsersListComponent(mockUserService);

})

  it("findAllShouldReturnAllUsers", ()=>{
    mockUserService.findAll.and.returnValue(of(USERLIST)); 

    componentUserList.getAll();

    expect(componentUserList.users).toEqual(USERLIST);
  })

  it("findPageShouldReturnUsersPage",()=>{

     let userPage = new UserPage();
     USERLIST.pageSize = 5;
      mockUserService.findPage.and.returnValue(of(USERLIST,userPage.pageable, USERLIST.pageSize)); 

    componentUserList.loadPage();
    expect(componentUserList.pageSize).toEqual(USERLIST.pageSize);

  })
 
});
