import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipModule } from 'primeng/tooltip';
import { QuestionnaireListComponent } from './views/questionnaire-list/questionnaire-list.component';
import { QuestionnaireNewComponent } from './views/questionnaire-new/questionnaire-new.component';
import { ToastModule } from 'primeng/toast';
import { BlockUIModule } from 'primeng/blockui';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListboxModule } from 'primeng/listbox';
import { QuestionQuestionnaireComponent } from './views/question-questionnaire/question-questionnaire.component';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
@NgModule({
  declarations: [
    QuestionnaireListComponent,
    QuestionnaireNewComponent,
    QuestionQuestionnaireComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    PaginatorModule,
    InputTextModule,
    ButtonModule,
    TranslateModule,
    TooltipModule,
    ToastModule,
    BlockUIModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    ListboxModule,
    CheckboxModule,
    RadioButtonModule
  ]
})
export class QuestionnaireModule { }
