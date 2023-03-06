import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './core/services/auth-guard.service';
import { LoginComponent } from './security/views/login/login.component';
import { LayoutComponent } from './core/views/layout/layout.component';
import { WelcomeComponent } from './core/views/welcome/welcome.component';
import { Role } from './core/models/Role';
import { QuestionnaireListComponent } from './questionnaire/views/questionnaire-list/questionnaire-list.component';
import { PatientDischargeComponent } from './assistance/views/patient-discharge/patient-discharge.component';
import { UsersListComponent } from './management/views/users-list/users-list.component';
import { PatientListComponent } from './assistance/views/patient-list/patient-list.component';
import { PatientEditComponent } from './assistance/views/patient-edit/patient-edit.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: 'welcome', component: WelcomeComponent,  canActivate: [AuthGuardService], data: { roles: [Role.Staff] }},
      { path: 'questionnaire', component: QuestionnaireListComponent, canActivate: [AuthGuardService], data: { roles: [Role.Staff] }},
      { path: 'patient-discharge', component: PatientDischargeComponent,  canActivate: [AuthGuardService], data: { roles: [Role.Staff] }},
      { path: 'patient-list', component: PatientListComponent,  canActivate: [AuthGuardService], data: { roles: [Role.Staff] }},
      { path: 'patient-edit/:id', component: PatientEditComponent },
      { path: 'users', component: UsersListComponent, canActivate: [AuthGuardService], data: { roles:[] }},
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      enableTracing: false
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
