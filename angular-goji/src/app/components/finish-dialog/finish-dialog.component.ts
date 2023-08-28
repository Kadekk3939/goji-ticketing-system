import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DialogService} from "../../services/dialog.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Request} from "../../interfaces/request";

@Component({
  selector: 'app-finish-dialog',
  templateUrl: './finish-dialog.component.html',
  styleUrls: ['./finish-dialog.component.css']
})
export class FinishDialogComponent implements OnInit{
  inputData:any;
  finishData:any;
  finishForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
              private ref:MatDialogRef<FinishDialogComponent>,
              private fb:FormBuilder,
              private service:DialogService){
    this.finishForm = this.fb.group({
      result: ['', Validators.required]
    });
  };

  ngOnInit(): void {
    this.inputData=this.data;
  }

  isFormValid(formGroup: FormGroup): boolean {
    return formGroup.valid;
  }

  saveData() {
    // setResult
    // this.service.updateRequest(this.inputData.id, <Request>this.finishForm.value).subscribe(res => {
    //     this.closeDialog();
    //   },
    //   (error: HttpErrorResponse) => {
    //     alert(error.message);
    //   }
    // );
    this.closeDialog();
  }

  closeDialog() {
    this.ref.close('Closed using function');
  }
}
