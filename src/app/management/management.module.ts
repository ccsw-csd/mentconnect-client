import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table'
import { PaginatorModule } from 'primeng/paginator';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { UsersListComponent } from './views/users-list/users-list.component';
import { UsersEditComponent } from './views/users-edit/users-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
@NgModule({
  declarations: [
    UsersListComponent,
    UsersEditComponent,
    
  ],
  imports: [
    FormsModule,
    DialogModule,
    ReactiveFormsModule,
    ButtonModule,
    BrowserModule,
    CommonModule,
    HttpClientModule,
    TableModule,
    PaginatorModule,
    TranslateModule,
    InputTextModule,
    
    
  ],
  exports : [UsersListComponent],
  schemas : [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class ManagementModule { }
