import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionnaireListComponent } from './views/questionnaire-list/questionnaire-list.component';
import {TableModule} from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {MultiSelectModule} from 'primeng/multiselect';



@NgModule({
  declarations: [
    QuestionnaireListComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    PaginatorModule,
    InputTextModule,
    ButtonModule,
    MultiSelectModule
  ]
})
export class QuestionnaireModule { }
