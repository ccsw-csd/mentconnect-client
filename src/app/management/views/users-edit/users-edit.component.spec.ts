import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { UsersEditComponent } from './users-edit.component';

describe('UsersEditComponent', () => {
  let usersEdit: UsersEditComponent;
  let mockUserService;
  let mockRoleService;
  let mockDynamicDialogConfig;
  let mockDynamicDialogRef;
  let mockTranslateService;
  let mockMessageService;
  let EXISTS_USER;
  let NOT_EXISTS_USER

  beforeEach( () => {
    EXISTS_USER = { id: 1, username: "admin", name: "Admin", surnames: "Admin", email: "Admin@admin", roles: [{id:1, code: "ADMIN", type:"INT"}] }
    NOT_EXISTS_USER = { id: 2, username: "admin", name: "Admin", surnames: "Admin", email: "Admin@admin", roles: [{id:1, code: "ADMIN", type:"INT"}] }

    mockUserService = jasmine.createSpyObj(["findAll", "modifyUser", "userFull"])
    mockRoleService = jasmine.createSpyObj(["findRoles"])
    mockDynamicDialogRef = jasmine.createSpyObj(["close"])
    mockDynamicDialogConfig = jasmine.createSpyObj([""])
    mockMessageService = jasmine.createSpyObj(["add"])
    mockTranslateService= jasmine.createSpyObj(["instant"])
    
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
    mockUserService.userFull.and.returnValue(of(EXISTS_USER));
    usersEdit.getUserFull(1);
    expect(usersEdit.userFull).toEqual(EXISTS_USER);
  });

  it('editIfArgumentsAreCorrect', () =>{
    mockUserService.modifyUser.and.returnValue(of(EXISTS_USER))
    usersEdit.onSave(EXISTS_USER)
    expect(usersEdit.onSave(EXISTS_USER)).not.toBeNull()
  });

  it('notEditIfNameOrPriorityAlreadyExists', () =>{
    let error = new HttpErrorResponse({ status: 409, error:{}})
    mockUserService.modifyUser.and.returnValue(throwError(() => error))
    usersEdit.onSave(NOT_EXISTS_USER)
    expect(usersEdit.onSave(EXISTS_USER)).not.toBeNull()
  });

}); 
