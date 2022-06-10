import { of } from 'rxjs';
import { UserPage } from 'src/app/management/models/UserPage';
import { UsersListComponent } from './users-list.component';

describe('UsersListComponent', () => {
let componentUserList : UsersListComponent
let mockUserService
let USERLIST


beforeEach(() => {
    USERLIST = [
    { id: 1, username: "admin", name: "Admin", surnames: "Admin", email: "Admin@admin" }
  ]

    mockUserService = jasmine.createSpyObj(["findAll","findPage"]);  
    componentUserList = new UsersListComponent(mockUserService);

})

  it("findPageShouldReturnUsersPage",()=>{

     let userPage = new UserPage();
     USERLIST.pageSize = 5;
     mockUserService.findPage.and.returnValue(of(USERLIST,userPage.pageable, USERLIST.pageSize)); 

    componentUserList.loadPage();
    expect(componentUserList.pageSize).toEqual(USERLIST.pageSize);

  })
 
});
