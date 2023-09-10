import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {User} from "../../interfaces/user";
import {HttpErrorResponse} from "@angular/common/http";
import {DialogService} from "../../services/dialog.service";
import {Product} from "../../interfaces/product";
import {Request} from "../../interfaces/request";
import { Task } from 'src/app/interfaces/task';
import {Issue} from "../../interfaces/issue";
import {Observable} from "rxjs";
import {Client} from "../../interfaces/client";

@Component({
  selector: 'app-add-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  issues$: Observable<Issue[]> | undefined;
  requests$: Observable<Request[]> | undefined;
  products$: Observable<Product[]> | undefined;
  clients$: Observable<Client[]> | undefined;
  isLoginWarningVisible=false
  isEmailWarningVisible=false
  type:any;
  inputData:any;
  editData:any;
  roles =  [
    {value: 'Admin', viewValue: 'Admin'},
    {value: 'Account Manager', viewValue: 'Account Manager'},
    {value: 'Product Manager', viewValue: 'Product Manager'},
    {value: 'Worker', viewValue: 'Worker'},
  ];

  types = ['Bug', 'Feature', 'Update'];

  public user:User|undefined;

  addUserForm: FormGroup;
  editUserForm: FormGroup;
  clientForm: FormGroup;
  productForm: FormGroup;
  requestForm: FormGroup;
  issueForm: FormGroup;
  taskForm: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
              private ref:MatDialogRef<DialogComponent>,
              private fb:FormBuilder,
              private service:DialogService) {
    this.addUserForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required]
    });

    this.editUserForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      login: ['', Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required]
    });

    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^\\+?\\d{1,4}[-\\s]?\\d{8,14}$')]]
    });

    this.productForm = this.fb.group({
      clientId: ['', Validators.required],
      productName: ['', Validators.required],
      version: ['', [Validators.required]],
      description: ['', Validators.required]
    });

    this.requestForm = this.fb.group({
      requestName: ['', Validators.required],
      description: ['', Validators.required],
      productId: ['', Validators.required]
    });

    this.issueForm = this.fb.group({
      requestId: ['', Validators.required],
      issueName: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required]
    });

    this.taskForm = this.fb.group({
      issueId: ['', Validators.required],
      taskName: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.inputData=this.data;
    this.type=this.inputData.type;
    if(this.inputData.id!=0)
    {
      this.setDialogData(this.inputData.id);
    }
    this.issues$ = this.service.getAllIssues();
    this.requests$ = this.service.getAllRequests();
    this.products$ = this.service.getAllProducts();
    this.clients$ = this.service.getAllClients();
  }

  setDialogData(id:any){
    if(this.type=="/users") {
      this.service.getUserById(id).subscribe(user => {
        this.editData = user;
        this.editUserForm.setValue({
          firstName: this.editData.firstName, lastName: this.editData.lastName, login: this.editData.login,
          email: this.editData.email, role: this.editData.role
        })
      })
    }
    else if(this.type=="/clients") {
      this.service.getClientById(id).subscribe(client => {
        this.editData = client;
        this.clientForm.setValue({
          name: this.editData.name,
          email: this.editData.email,
          phoneNumber: this.editData.phoneNumber
        })
      })
    }
    else if(this.type=="/products") {
      this.service.getProductById(id).subscribe(product => {
        this.editData = product;
        this.productForm.setValue({
          clientId: this.editData.clientId,
          productName: this.editData.productName,
          version: this.editData.version,
          description: this.editData.description
        })
      })
    }
    else if(this.type=="/requests") {
      this.service.getRequestById(id).subscribe(request => {
        this.editData = request;
        this.requestForm.setValue({
          requestName: this.editData.requestName,
          description: this.editData.description,
          productId: this.editData.productId
        })
      })
    }
    else if(this.type=="/issues") {
      this.service.getIssueById(id).subscribe(issue => {
        this.editData = issue;
        this.issueForm.setValue({
          requestId: this.editData.requestId,
          issueName: this.editData.issueName,
          description: this.editData.description,
          type: this.editData.type
        })
      })
    }
    else if(this.type=="/tasks") {
      this.service.getTaskById(id).subscribe(task => {
        this.editData = task;
        this.taskForm.setValue({
          issueId: this.editData.issueId,
          taskName: this.editData.taskName,
          description: this.editData.description,
          type: this.editData.type
        })
      })
    }
  }

  closeDialog(id:string) {
    this.ref.close(id);
  }

  isFormValid(formGroup: FormGroup): boolean {
    return formGroup.valid;
  }

  SaveData(){
    if(this.type=="/users") {
      if(this.inputData.id==0) {
        this.service.addUser(<User>this.addUserForm.value).subscribe(res => {
            this.closeDialog(res.userId);
          },
          (error: HttpErrorResponse) => {
            if (error.status === 409) {
              // Object not found, handle the error message
              let errorId = error.error;
              if(errorId=='1'){
                this.isEmailWarningVisible = true
              }
              else if(errorId=='2'){
                this.isLoginWarningVisible=true
              }
              else if(errorId=='3'){
                this.isLoginWarningVisible=true
                this.isEmailWarningVisible = true
              }
            } else {
            alert(error.message);
            }
          }
        );
      }
      else {
       if(this.inputData.id!=undefined) {
         this.service.updateUser(this.inputData.id, <User>this.editUserForm.value).subscribe(res => {
             this.closeDialog(this.inputData.id);
           },
           (error: HttpErrorResponse) => {
             alert(error.message);
           }
         );
       }
      }
    }
    else if(this.type=="/clients") {
      if(this.inputData.id==0) {
        this.service.addClient(<Client>this.clientForm.value).subscribe(res => {
            this.closeDialog(res.clientId.toString());
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }
      else {
        if(this.inputData.id!=undefined) {
          this.service.updateClient(this.inputData.id, <Client>this.clientForm.value).subscribe(res => {
              this.closeDialog(this.inputData.id);
            },
            (error: HttpErrorResponse) => {
              alert(error.message);
            }
          );
        }
      }
    }
    else if(this.type=="/products") {
      if(this.inputData.id==0) {
        this.service.addProduct(<Product>this.productForm.value).subscribe(res => {
            this.closeDialog(res.productId.toString());
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }
      else {
        if(this.inputData.id!=undefined) {
          this.service.updateProduct(this.inputData.id, <Product>this.productForm.value).subscribe(res => {
              this.closeDialog(this.inputData.id);
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
            this.closeDialog(res.requestId.toString());
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }
      else {
        if(this.inputData.id!=undefined) {
          this.service.updateRequest(this.inputData.id, <Request>this.requestForm.value).subscribe(res => {
              this.closeDialog(this.inputData.id);
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
            this.closeDialog(res.issueId.toString());
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }
      else {
        if(this.inputData.id!=undefined) {
          this.service.updateIssue(this.inputData.id, <Issue>this.issueForm.value).subscribe(res => {
              this.closeDialog(this.inputData.id);
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
            this.closeDialog(res.taskId.toString());
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }
      else {
        if(this.inputData.id!=undefined) {
          this.service.updateTask(this.inputData.id, <Task>this.taskForm.value).subscribe(res => {
              this.closeDialog(this.inputData.id);
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
