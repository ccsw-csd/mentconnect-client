import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
@Component({
  selector: 'app-dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
  styleUrls: ['./dialog-confirmation.component.scss']
})
export class DialogConfirmationComponent implements OnInit {
  visible: boolean;
  constructor(private ref: DynamicDialogRef) { }

  ngOnInit(): void {
  }
  

  onYes() {
    this.ref.close(true);
  }

  onNo() {
    this.ref.close(false);
  }



}
