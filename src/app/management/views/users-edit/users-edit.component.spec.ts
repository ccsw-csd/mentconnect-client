import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { User } from '../../models/User';
import { UserFull } from '../../models/UserFull';
import { UsersEditComponent } from './users-edit.component';

describe('UsersEditComponent', () => {
  let usersEdit: UsersEditComponent;
  let mockUserService;
  let mockRoleService;
  let mockPatientService;
  let mockDynamicDialogConfig;
  let mockDynamicDialogRef;
  let mockTranslateService;
  let mockMessageService;
  let USERFULL;

  beforeEach( () => {
    USERFULL = { id: 1, username: "admin", name: "Admin", surnames: "Admin", email: "Admin@admin", roles: [{id:1, code: "ADMIN", type:"INT"}] }
    
    mockUserService = jasmine.createSpyObj(["findAll", "modifyUser", "userFull"])
    mockRoleService = jasmine.createSpyObj(["findRoles"])
    mockPatientService = jasmine.createSpyObj(["findAllPatients"])
    mockDynamicDialogRef = jasmine.createSpyObj(["close"])
    mockDynamicDialogConfig = jasmine.createSpyObj([""])
    mockTranslateService = jasmine.createSpyObj(["instant"])
    mockMessageService = jasmine.createSpyObj(["add"])

    usersEdit = new UsersEditComponent(
      mockUserService,
      mockRoleService,
      mockPatientService,
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
