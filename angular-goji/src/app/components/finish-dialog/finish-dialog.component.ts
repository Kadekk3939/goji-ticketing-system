import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-finish-dialog',
  templateUrl: './finish-dialog.component.html',
  styleUrls: ['./finish-dialog.component.css']
})
export class FinishDialogComponent {

  constructor(private ref:MatDialogRef<FinishDialogComponent>){};

  closeDialog() {
    this.ref.close('Closed using function');
  }
}
