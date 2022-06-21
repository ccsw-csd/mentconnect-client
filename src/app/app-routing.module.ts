import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './core/services/auth-guard.service';
import { LoginComponent } from './security/views/login/login.component';
import { LayoutComponent } from './core/views/layout/layout.component';
import { WelcomeComponent } from './core/views/welcome/welcome.component';
import { Role } from './core/models/Role';
import { QuestionnaireListComponent } from './questionnaire/views/questionnaire-list/questionnaire-list.component';
import { UsersListComponent } from './management/views/users-list/users-list.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent},
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: 'welcome', component: WelcomeComponent,  canActivate: [AuthGuardService], data: { roles: [Role.Staff] }},
      { path: 'users', component: UsersListComponent, canActivate: [AuthGuardService], data: { roles: [Role.Admin] } },
      { path: 'questionnaire', component: QuestionnaireListComponent, canActivate: [AuthGuardService], data: { roles: [Role.Staff] }},
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' },
    ]
  },  
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      enableTracing: false,
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
