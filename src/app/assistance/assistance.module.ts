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

@NgModule({
  declarations: [
    PatientDischargeComponent
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
    BlockUIModule
  ]
})
export class AssistanceModule { }
