import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table'
import { PaginatorModule } from 'primeng/paginator';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { UsersListComponent } from './views/users-list/users-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    UsersListComponent
  ],
  imports: [
    ButtonModule,
    BrowserModule,
    CommonModule,
    HttpClientModule,
    TableModule,
    PaginatorModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ]
})
export class ManagementModule { }
