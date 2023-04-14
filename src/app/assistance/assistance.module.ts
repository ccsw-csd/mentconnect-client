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
import { MultiSelectModule } from 'primeng/multiselect';
import { PatientEditComponent } from './views/patient-edit/patient-edit.component';
import { DatePipe } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import {ToolbarModule} from 'primeng/toolbar';
import { PatientEvaluationComponent } from './views/patient-evaluation/patient-evaluation.component';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import { ListboxModule } from 'primeng/listbox';
import { PatientQuestionnaireComponent } from './views/patient-questionnaire/patient-questionnaire.component';
import { PatientDiaryComponent } from './views/patient-diary/patient-diary.component';
import {DividerModule} from 'primeng/divider';
@NgModule({
  declarations: [
    PatientDischargeComponent,
    PatientListComponent,
    PatientEditComponent,
    PatientQuestionnaireComponent,
    PatientEvaluationComponent,
    PatientDiaryComponent,
    
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
    TableModule,
    MultiSelectModule,
    TabViewModule,
    ToolbarModule,
    VirtualScrollerModule,
    ListboxModule,
    DividerModule
  ],
  providers:[
    DatePipe,
  ]
})
export class AssistanceModule { }
