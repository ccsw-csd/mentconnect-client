import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table'
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from "primeng/inputtext";
import {ToastModule} from 'primeng/toast';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { UsersListComponent } from './views/users-list/users-list.component';
import { UsersEditComponent } from './views/users-edit/users-edit.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { ListboxModule } from 'primeng/listbox';
import {TooltipModule} from 'primeng/tooltip';

@NgModule({
  declarations: [
    UsersListComponent,
    UsersEditComponent
  ],
  imports: [
    ButtonModule,
    BrowserModule,
    CommonModule,
    HttpClientModule,
    TableModule,
    PaginatorModule,
    InputTextModule,
    ToastModule,
    TranslateModule,
    MultiSelectModule,
    ListboxModule,
    TooltipModule
  ]
})
export class ManagementModule { }
