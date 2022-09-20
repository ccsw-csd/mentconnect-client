import { of } from 'rxjs';
import { UsersEditComponent } from './users-edit.component';

describe('UsersEditComponent', () => {
  let usersEdit: UsersEditComponent;
  let mockUserService;
  let mockRoleService;
  let mockDynamicDialogConfig;
  let mockDynamicDialogRef;
  let USERFULL;
  let mockTranslateService;
  let mockMessageService;

  beforeEach( () => {
    USERFULL = { id: 1, username: "admin", name: "Admin", surnames: "Admin", email: "Admin@admin", roles: [{id:1, code: "ADMIN", type:"INT"}] }
    
    mockUserService = jasmine.createSpyObj(["findAll", "modifyUser", "userFull"])
    mockRoleService = jasmine.createSpyObj(["findRoles"])
    mockDynamicDialogRef = jasmine.createSpyObj(["close"])
    mockDynamicDialogConfig = jasmine.createSpyObj([""])
    mockTranslateService = jasmine.createSpyObj(["instant"])
    mockMessageService = jasmine.createSpyObj(["add"])
    
    usersEdit = new UsersEditComponent(
      mockUserService,
      mockRoleService,
      mockDynamicDialogRef,
      mockDynamicDialogConfig,
      mockTranslateService,
      mockMessageService
      );
  });

  it('getUserFullShouldReturnUserFull', () =>{
    mockUserService.userFull.and.returnValue(of(USERFULL));
    usersEdit.getUserFull(1);
    expect(usersEdit.userFull).toEqual(USERFULL);
  });

  it('editIfArgumentsAreCorrect', () =>{
    mockUserService.modifyUser.and.returnValue(of(USERFULL))
    usersEdit.onSave(USERFULL)
    expect(usersEdit.onSave(USERFULL)).not.toBeNull()
  });
});
