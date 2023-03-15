import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-patient-questionnaire',
  templateUrl: './patient-questionnaire.component.html',
  styleUrls: ['./patient-questionnaire.component.scss']
})
export class PatientQuestionnaireComponent implements OnInit {

  constructor(public ref: DynamicDialogRef,) { }

  ngOnInit(): void {
  }
  onClose(){
    this.ref.close();
  }

}
