import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {User} from "../../interfaces/user";
import {HttpErrorResponse} from "@angular/common/http";
import {DialogService} from "../../services/dialog.service";
import {Request} from "../../interfaces/request";
import { Task } from 'src/app/interfaces/task';
import {Issue} from "../../interfaces/issue";

@Component({
  selector: 'app-add-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  type:any;
  inputData:any;
  editData:any;
  roles =  [
    {value: 'Admin', viewValue: 'Admin'},
    {value: 'Account Manager', viewValue: 'Account Manager'},
    {value: 'Product Manager', viewValue: 'Product Manager'},
    {value: 'Worker', viewValue: 'Worker'},
  ];
  public user:User|undefined;

  userForm: FormGroup;
  requestForm: FormGroup;
  issueForm: FormGroup;
  taskForm: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
              private ref:MatDialogRef<DialogComponent>,
              private fb:FormBuilder,
              private service:DialogService) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required]
    });

    this.requestForm = this.fb.group({
      requestName: ['', Validators.required],
      description: ['', Validators.required],
      productId: [0, Validators.required]
    });

    this.issueForm = this.fb.group({
      requestId: [0, Validators.required],
      issueName: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.taskForm = this.fb.group({
      issueId: [0, Validators.required],
      taskName: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.inputData=this.data;
    this.type=this.inputData.type;
    if(this.inputData.id!=0)
    {
      this.setDialogData(this.inputData.id);
    }
  }

  setDialogData(id:any){
    if(this.type=="/users") {
      this.service.getUserById(id).subscribe(user => {
        this.editData = user;
        this.userForm.setValue({
          firstName: this.editData.firstName, lastName: this.editData.lastName, login: this.editData.login,
          password: this.editData.password, email: this.editData.email, role: this.editData.role
        })
      })
    }
    else if(this.type=="/requests") {
      this.service.getRequestById(id).subscribe(request => {
        this.editData = request;
        this.requestForm.setValue({
          requestName: this.editData.requestName, description: this.editData.description,
          productId: this.requestForm.value.productId !== undefined ? this.requestForm.value.productId : 0
        })
      })
    }
    else if(this.type=="/issues") {
      this.service.getIssueById(id).subscribe(issue => {
        this.editData = issue;
        this.issueForm.setValue({
          requestId: this.issueForm.value.requestId !== undefined ? this.issueForm.value.requestId : 0,
          issueName: this.editData.issueName, description: this.editData.description
        })
      })
    }
    else if(this.type=="/tasks") {
      this.service.getTaskById(id).subscribe(task => {
        this.editData = task;
        this.taskForm.setValue({
          issueId: this.taskForm.value.issueId!== undefined ? this.taskForm.value.issueId : 0,
          taskName: this.editData.taskName, description: this.editData.description
        })
      })
    }
  }

  closeDialog() {
    this.ref.close('Closed using function');
  }

  isFormValid(formGroup: FormGroup): boolean {
    return formGroup.valid;
  }

  SaveData(){
    if(this.type=="/users") {
      if(this.inputData.id==0) {
        this.service.addUser(<User>this.userForm.value).subscribe(res => {
            this.closeDialog();
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }
      else {
       if(this.inputData.id!=undefined) {
         this.service.updateUser(this.inputData.id, <User>this.userForm.value).subscribe(res => {
             this.closeDialog();
           },
           (error: HttpErrorResponse) => {
             alert(error.message);
           }
         );
       }
      }
    }
    else if(this.type=="/requests") {
      if(this.inputData.id==0) {
        this.service.addRequest(<Request>this.requestForm.value).subscribe(res => {
            this.closeDialog();
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }
      else {
        if(this.inputData.id!=undefined) {
          this.service.updateRequest(this.inputData.id, <Request>this.requestForm.value).subscribe(res => {
              this.closeDialog();
            },
            (error: HttpErrorResponse) => {
              alert(error.message);
            }
          );
        }
      }
    }
    else if(this.type=="/issues") {
      if(this.inputData.id==0) {
        this.service.addIssue(<Issue>this.issueForm.value).subscribe(res => {
            this.closeDialog();
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }
      else {
        if(this.inputData.id!=undefined) {
          this.service.updateIssue(this.inputData.id, <Issue>this.issueForm.value).subscribe(res => {
              this.closeDialog();
            },
            (error: HttpErrorResponse) => {
              alert(error.message);
            }
          );
        }
      }
    }
    else if(this.type=="/tasks") {
      if(this.inputData.id==0) {
        this.service.addTask(<Task>this.taskForm.value).subscribe(res => {
            this.closeDialog();
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }
      else {
        if(this.inputData.id!=undefined) {
          this.service.updateTask(this.inputData.id, <Task>this.taskForm.value).subscribe(res => {
              this.closeDialog();
            },
            (error: HttpErrorResponse) => {
              alert(error.message);
            }
          );
        }
      }
    }
  }

}
