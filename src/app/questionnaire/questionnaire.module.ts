import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';
import {TooltipModule} from 'primeng/tooltip';
import { QuestionnaireListComponent } from './views/questionnaire-list/questionnaire-list.component';

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
    TranslateModule,
    TooltipModule,
  ]
})
export class QuestionnaireModule { }
