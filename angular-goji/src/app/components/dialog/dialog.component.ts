import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, NgForm} from "@angular/forms";
import {User} from "../../interfaces/user";
import {HttpErrorResponse} from "@angular/common/http";
import {DialogService} from "../../services/dialog.service";

@Component({
  selector: 'app-add-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  userRole:any;
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
    this.userRole=this.inputData.userRole;
    if(this.inputData.id!=0)
    {
      this.setDialogData(this.inputData.id);
    }
  }

  setDialogData(id:any){
    if(this.userRole=="Admin") {
      this.service.getUserByLogin(id).subscribe(user => {
        this.editData = user;
        this.myform.setValue({
          firstName: this.editData.firstName, lastName: this.editData.lastName, login: this.editData.login,
          password: "1", email: this.editData.email, role: this.editData.role
        })
      })
    }
  }

  closeAddDialog()
  {
    this.ref.close('Closed using function');
  }

    myform=this.builder.group({
      firstName:this.builder.control(''),
      lastName:this.builder.control(''),
      login:this.builder.control(''),
      password:this.builder.control(''),
      email:this.builder.control(''),
      role:this.builder.control('')
    });


  SaveData(){
    if(this.userRole=="Admin") {
      if(this.inputData.id==0) {
        this.service.addUser(<User>this.myform.value).subscribe(res => {
            this.closeAddDialog();
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }
      else {
        this.service.updateUser(<User>this.myform.value).subscribe(res => {
            this.closeAddDialog();
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }
    }
  }

}
