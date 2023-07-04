import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, NgForm} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {User} from "../../interfaces/user";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {
  inputData:any;
  roles =  [
    {value: 'Admin', viewValue: 'Admin'},
    {value: 'Account Manager', viewValue: 'Account Manager'},
    {value: 'Product Manager', viewValue: 'Product Manager'},
    {value: 'Worker', viewValue: 'Worker'},
  ];
  public user:User|undefined;
  closemessage='Closed using directive'
  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private ref:MatDialogRef<AddDialogComponent>, private builder:FormBuilder,
              private service:UserService) {
  }
  ngOnInit(): void {
    this.inputData=this.data;
  }
  closeAddDialog()
  {
    this.ref.close('Closed using function');
  }

  myform=this.builder.group({
   // id:this.builder.control( 0 ),
    firstName:this.builder.control(''),
    lastName:this.builder.control(''),
    login:this.builder.control(''),
    password:this.builder.control(''),
    email:this.builder.control(''),
    role:this.builder.control('')
  });

  SaveUser(){
    this.service.addUser(<User>this.myform.value).subscribe(res=>{
      this.closeAddDialog();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
