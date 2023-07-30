import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import { User } from "src/app/interfaces/user";
import {MatTableDataSource} from "@angular/material/table";
import {HttpErrorResponse} from "@angular/common/http";
import {ListService} from "../../services/list.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatDialogConfig} from "@angular/material/dialog";
import { AppService } from 'src/app/services/app.service';
import { Issue } from 'src/app/interfaces/issue';
import { Task } from 'src/app/interfaces/task';
import { UserService } from 'src/app/services/user.service';
import { Request } from 'src/app/interfaces/request';
import {DialogComponent} from "../dialog/dialog.component";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  control = new FormControl("steak-0");
  value = '';
  selected = '';
  public type:string | undefined;
  public users: User[] | undefined;
  public user:User|undefined;
  public elements:(Request|Issue|Task|User)[];
  public originalElements:(Request|Issue|Task|User)[];
  public pageSlice: (Request|Issue|Task|User)[];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private router: Router,private dialog: MatDialog,private listService:ListService,
    private app:AppService,private userService:UserService) {
      this.app.refresh();//In case of refresh
      this.user = this.app.user;

      this.elements = [];
      this.originalElements =[];
      this.pageSlice = [];
      this.type=router.url;
    this.control.valueChanges.subscribe(s => {
      console.log(`The selected value is ${s}`);
    });
    }
  ngOnInit() {
    this.getData();

  }

  public getData(){
    this.userService.getUserByLogin(this.app.login).subscribe(
      (response:User)=>{
        this.user = response;
        if(this.user.role=='Admin')
        {
          if(this.type!="/users")
          {
            this.router.navigateByUrl('/users');
          }

          this.listService.getAllUsers().subscribe(
            (response:User[])=>{
              response.forEach(user=>{
                this.elements?.push(user);
              })
              this.pageSlice = this.elements!.slice(0,2);
            }
          )
        }
        else if(this.user.role=='Account Manager'){
          if(this.type=="/users")
          {
            this.router.navigateByUrl('/requests');
          }
          if(this.router.url=="/requests") {
            this.listService.getAllRequests().subscribe(
              (response: Request[]) => {
                response.forEach(request => {
                  this.elements?.push(request);
                })
               this.pageSlice = this.elements!.slice(0,2);
              }
            )
          }
          if(this.router.url=="/issues") {
            this.listService.getAllIssues().subscribe(
              (response: Issue[]) => {
                response.forEach(issue => {
                  this.elements?.push(issue);
                })
                this.pageSlice = this.elements!.slice(0,2);
              }
            )
          }
          if(this.router.url=="/tasks") {
            this.listService.getAllTasks().subscribe(
              (response: Task[]) => {
                response.forEach(task => {
                  this.elements?.push(task);
                })
                this.pageSlice = this.elements!.slice(0,2);
              }
            )
          }

        }
        else if(this.user.role=='Product Manager'){
          if(this.type=="/users" || this.type=="/requests")
          {
            this.router.navigateByUrl('/issues');
          }
          if(this.router.url=="/issues") {
            this.listService.getAllIssues().subscribe(
              (response: Issue[]) => {
                response.forEach(issue => {
                  this.elements?.push(issue);
                })
                this.pageSlice = this.elements!.slice(0,2);
              }
            )
          }
          if(this.router.url=="/tasks") {
            this.listService.getAllTasks().subscribe(
              (response: Task[]) => {
                response.forEach(task => {
                  this.elements?.push(task);
                })
               this.pageSlice = this.elements!.slice(0,2);
              }
            )
          }
        }
        else if(this.user.role=='Worker'){
          if(this.type!="/tasks")
          {
            this.router.navigateByUrl('/tasks');
          }
          this.listService.getAllTasks().subscribe(
            (response:Task[])=>{
              response.forEach(task=>{
                this.elements?.push(task);
              })
              this.pageSlice = this.elements!.slice(0,2);
            }
          )
        }
      }
    )
    this.originalElements=this.elements;
  }

  public logout(): void {
    this.router.navigateByUrl('/');
  }

  getId(obj:Request|Issue|Task|User):number{
    switch (typeof obj) {
      case 'object': {
        if ('requestName' in obj) {
          return (obj as Request).requestId;
        } else if ('issueName' in obj) {
          return (obj as Issue).issueId;
        } else if ('taskName' in obj) {
          return (obj as Task).taskId;
        }
        else if ('firstName' in obj) {
          return (obj as User).userId;
        }
        break;
      }
      default: {
        break;
      }
    }
    return -1;
  }

  getName(obj:Request|Issue|Task|User):string{
    switch (typeof obj) {
      case 'object': {
        if ('requestName' in obj) {
          return (obj as Request).requestName;
        } else if ('issueName' in obj) {
          return (obj as Issue).issueName;
        } else if ('taskName' in obj) {
          return (obj as Task).taskName;
        }
        else if ('firstName' in obj) {
          return (obj as User).firstName + " " + (obj as User).lastName;
        }
        break;
      }
      default: {
        break;
      }
    }
    return '';
  }
  getOpenDate(obj:Request|Issue|Task|User):Date{
    switch (typeof obj) {
      case 'object': {
        if ('requestName' in obj) {
          return (obj as Request).openDate;
        } else if ('issueName' in obj) {
          return (obj as Issue).openDate;
        } else if ('taskName' in obj) {
          return (obj as Task).openDate;
        }
        break;
      }
      default: {
        break;
      }
    }
    return new Date();
  }
  getProgressDate(obj:Request|Issue|Task|User):Date{
    switch (typeof obj) {
      case 'object': {
        if ('requestName' in obj) {
          return (obj as Request).inProgressDate;
        } else if ('issueName' in obj) {
          return (obj as Issue).inProgressDate;
        } else if ('taskName' in obj) {
          return (obj as Task).inProgressDate;
        }
        break;
      }
      default: {
        break;
      }
    }
    return new Date();
  }

  getFinishDate(obj:Request|Issue|Task|User):Date{
    switch (typeof obj) {
      case 'object': {
        if ('requestName' in obj) {
          return (obj as Request).finalizationDate;
        } else if ('issueName' in obj) {
          return (obj as Issue).finalizationDate;
        } else if ('taskName' in obj) {
          return (obj as Task).finalizationDate;
        }
        break;
      }
      default: {
        break;
      }
    }
    return new Date();
  }

  getInfo(obj:Request|Issue|Task|User):string[]{
    switch (typeof obj) {
      case 'object': {
        if ('requestName' in obj) {
          return [(obj as Request).status, (obj as Request).openDate.toString().slice(0,10)];
        } else if ('issueName' in obj) {
          return [(obj as Issue).status, (obj as Issue).openDate.toString().slice(0,10)];
        } else if ('taskName' in obj) {
          return [(obj as Task).status, (obj as Task).openDate.toString().slice(0,10)];
        }
        else if ('firstName' in obj) {
          return [(obj as User).login, (obj as User).email, (obj as User).role];
        }
        break;
      }
      default: {
        break;
      }
    }
    return [''];
  }

  onSortOptionSelected() {
    // Sort the array based on the selected option
    switch (this.selected) {
      case 'opendown':
        this.elements.sort((a, b) => new Date(this.getOpenDate(b)).getTime() - new Date(this.getOpenDate(a)).getTime());
        this.paginator?.lastPage()
        this.paginator?.firstPage()
        break;
      case 'openup':
        this.elements.sort((a, b) => new Date(this.getOpenDate(a)).getTime() - new Date(this.getOpenDate(b)).getTime());
        this.paginator?.lastPage()
        this.paginator?.firstPage()
        break;
      case 'startdown':
        this.elements.sort((a, b) => new Date(this.getProgressDate(b)).getTime() - new Date(this.getProgressDate(a)).getTime());
        this.paginator?.lastPage()
        this.paginator?.firstPage()
        break;
      case 'startup':
        this.elements.sort((a, b) => new Date(this.getProgressDate(a)).getTime() - new Date(this.getProgressDate(b)).getTime());
        this.paginator?.lastPage()
        this.paginator?.firstPage()
        break;
      case 'finishdown':
        this.elements.sort((a, b) => new Date(this.getFinishDate(b)).getTime() - new Date(this.getFinishDate(a)).getTime());
        this.paginator?.lastPage()
        this.paginator?.firstPage()
        break;
      case 'finishup':
        this.elements.sort((a, b) => new Date(this.getFinishDate(a)).getTime() - new Date(this.getFinishDate(b)).getTime());
        this.paginator?.lastPage()
        this.paginator?.firstPage()
        break;
      default:
        this.elements=[];
        this.getData()
        this.paginator?.lastPage()
        this.paginator?.firstPage()
        break;
    }
  }

  onSortUserOptionSelected() {
    // Sort the array based on the selected option
    switch (this.selected) {
      case 'asc':
        this.elements.sort((a, b) => {
        const nameA = this.getName(a).toLowerCase(); // Convert to lowercase for case-insensitive sorting
        const nameB = this.getName(b).toLowerCase();

        if (nameA < nameB) {
          return -1; // a comes before b
        } else if (nameA > nameB) {
          return 1; // a comes after b
        } else {
          return 0; // names are equal
        }
      });
        this.paginator?.lastPage()
        this.paginator?.firstPage()
        break;
      case 'desc':
        this.elements.sort((a, b) => {
          const nameA = this.getName(a).toLowerCase(); // Convert to lowercase for case-insensitive sorting
          const nameB = this.getName(b).toLowerCase();

          if (nameA < nameB) {
            return 1; // a comes before b
          } else if (nameA > nameB) {
            return -1; // a comes after b
          } else {
            return 0; // names are equal
          }
        });
        this.paginator?.lastPage()
        this.paginator?.firstPage()
        break;
      default:
        this.elements=[];
        this.getData()
        this.paginator?.lastPage()
        this.paginator?.firstPage()
        break;
    }
  }

  onSearch() {
    this.elements = this.originalElements.filter((element) =>
      this.getName(element).includes(this.value.toLowerCase())
    );
    if(this.paginator?.pageIndex!=undefined&&this.paginator?.pageSize!=undefined)
    {
      const startIndex = this.paginator?.pageIndex*this.paginator?.pageSize;
      let endIndex = startIndex+this.paginator?.pageSize;
      if(endIndex>this.elements!.length){
        endIndex=this.elements!.length;
      }
      this.pageSlice = this.elements!.slice(startIndex,endIndex);
    }
  }


  clearSearch() {
    this.value = '';
    this.onSearch();
  }

  public OnPageChange(event:PageEvent) {
    const startIndex = event.pageIndex*event.pageSize;
    let endIndex = startIndex+event.pageSize;
    if(endIndex>this.elements!.length){
      endIndex=this.elements!.length;
    }
    this.pageSlice = this.elements!.slice(startIndex,endIndex);
  }

  editData(id:any, type:any)
  {
    if(type=="/users")
    {
      this.openDialog(id,'Edit user', type);
    }
    else
      this.openDialog(id,'Edit', type);
  }

  addData(type:any)
  {
    if(type=="/users") {
      this.openDialog(0, 'Add user', type);
    }
    else
      this.openDialog(0, 'Add', type);
  }


  openDialog(id:any, title:any, type:any)
  {
    this.value='';
    var _dialog = this.dialog.open(DialogComponent, {
      width:'40%',
      enterAnimationDuration:'500ms',
      exitAnimationDuration:'500ms',
      data:{
        title: title,
        id: id,
        type: type
      }
    })
    _dialog.afterClosed().subscribe(item=>{
        this.elements=[];
        this.getData();
        this.paginator?.lastPage()
      }
    );
  }
}




