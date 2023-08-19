import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, NgForm} from "@angular/forms";
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
  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private ref:MatDialogRef<DialogComponent>, private builder:FormBuilder,
              private service:DialogService) {
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

  closeDialog()
  {
    this.ref.close('Closed using function');
  }
    userForm = this.builder.group({
      firstName: this.builder.control(''),
      lastName: this.builder.control(''),
      login: this.builder.control(''),
      password: this.builder.control(''),
      email: this.builder.control(''),
      role: this.builder.control('')
    });
  requestForm = this.builder.group({
    requestName: this.builder.control(''),
    description: this.builder.control(''),
    productId: this.builder.control(0)
  });

  issueForm = this.builder.group({
    requestId: this.builder.control(0),
    issueName: this.builder.control(''),
    description: this.builder.control('')
  });

  taskForm = this.builder.group({
    issueId: this.builder.control(0),
    taskName: this.builder.control(''),
    description: this.builder.control('')
  });



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
