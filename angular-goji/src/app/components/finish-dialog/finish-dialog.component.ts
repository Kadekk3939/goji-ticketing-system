import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DialogService} from "../../services/dialog.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Request} from "../../interfaces/request";
import {StatusService} from "../../services/status.service";

@Component({
  selector: 'app-finish-dialog',
  templateUrl: './finish-dialog.component.html',
  styleUrls: ['./finish-dialog.component.css']
})
export class FinishDialogComponent implements OnInit{
  inputData:any;
  objType:string = '';
  finishForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
              private ref:MatDialogRef<FinishDialogComponent>,
              private fb:FormBuilder,
              private service:StatusService){
    this.finishForm = this.fb.group({
      result: ['', Validators.required]
    });
  };

  ngOnInit(): void {
    this.inputData=this.data;
    this.objType=this.data.objectType;
  }

  isFormValid(formGroup: FormGroup): boolean {
    return formGroup.valid;
  }

  saveData() {
    if(this.objType == 'request')
    {
      this.service.setRequestStatusClosed(this.inputData.id,this.finishForm.controls['result'].value).subscribe(res => {
          this.closeDialog();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
    else if(this.objType == 'issue')
    {
      this.service.setIssueStatusClosed(this.inputData.id,this.finishForm.controls['result'].value).subscribe(res => {
          this.closeDialog();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
    else if(this.objType == 'task')
    {
      this.service.setTaskStatusClosed(this.inputData.id,this.finishForm.controls['result'].value).subscribe(res => {
          this.closeDialog();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
    this.closeDialog();
  }

  closeDialog() {
    this.ref.close('Closed using function');
  }
}
