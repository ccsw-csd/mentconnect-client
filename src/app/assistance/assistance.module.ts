import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientDischargeComponent } from './views/patient-discharge/patient-discharge.component';
import { CardModule, } from 'primeng/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule} from 'primeng/dropdown';
import { TranslateModule } from '@ngx-translate/core';
import { CalendarModule } from 'primeng/calendar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessagesModule } from "primeng/messages";
import { MessageModule } from "primeng/message";
import { ToastModule } from 'primeng/toast';
import { BlockUIModule } from 'primeng/blockui';
import { PatientListComponent } from './views/patient-list/patient-list.component';
import { TableModule } from 'primeng/table'

// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
// import { TableModule } from 'primeng/table'
// import { PaginatorModule } from 'primeng/paginator';
// import { InputTextModule } from "primeng/inputtext";
// import {ToastModule} from 'primeng/toast';
// import { TranslateModule } from '@ngx-translate/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { ButtonModule } from 'primeng/button';
// import { UsersListComponent } from './views/users-list/users-list.component';
// import { UsersEditComponent } from './views/users-edit/users-edit.component';
// import { MultiSelectModule } from 'primeng/multiselect';
// import { ListboxModule } from 'primeng/listbox';


@NgModule({
  declarations: [
    PatientDischargeComponent,
    PatientListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    KeyFilterModule,
    InputMaskModule,
    DropdownModule,
    TranslateModule,
    CalendarModule,
    ProgressSpinnerModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    BlockUIModule,
    TableModule
  ]
})
export class AssistanceModule { }
