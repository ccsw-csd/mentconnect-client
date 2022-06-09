import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table'
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';
import {MultiSelectModule} from 'primeng/multiselect';
import { UsersListComponent } from './views/layout/users-list/users-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    UsersListComponent,

  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    PaginatorModule,
    InputTextModule,
    ButtonModule,
    MultiSelectModule,
    TranslateModule,
    BrowserAnimationsModule,
    InputTextModule
    
  
  ]
})
export class ManagementModule { }
