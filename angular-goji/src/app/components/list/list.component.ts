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

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public users: User[] | undefined;
  public user:User|undefined;
  public elements:(Request|Issue|Task|User)[];
  public pageSlice: (Request|Issue|Task|User)[];
  constructor(private router: Router,private dialog: MatDialog,private listService:ListService,
    private app:AppService,private userService:UserService) {
      this.app.refresh();//In case of refresh
      this.user = this.app.user;
      this.elements = [];
      this.pageSlice = [];
    }
  ngOnInit() {
    this.user = this.app.user;
    this.getData();
    this.app.refresh();
  }

  public getData(){
    this.userService.getUserByLogin(this.app.login).subscribe(
      (response:User)=>{
        this.user = response;
        if(this.user.role=='Admin')
        {
          this.listService.getAllUsers().subscribe(
            (response:User[])=>{
              response.forEach(user=>{
                this.elements?.push(user);
                if(this.pageSlice.length<2)
                {
                  this.pageSlice?.push(user);
                }
              })

            }
          )
        }
        else if(this.user.role=='Account Manager'){

          this.listService.getAllRequests().subscribe(
            (response:Request[])=>{
              response.forEach(request=>{
                this.elements?.push(request);
                if(this.pageSlice.length<2)
                {
                  this.pageSlice?.push(request);
                }
              })

            }
          )
          this.listService.getAllIssues().subscribe(
            (response:Issue[])=>{
              response.forEach(issue=>{
                this.elements?.push(issue);
                if(this.pageSlice.length<2)
                {
                  this.pageSlice?.push(issue);
                }
              })
            }
          )
          this.listService.getAllTasks().subscribe(
            (response:Task[])=>{
              response.forEach(task=>{
                this.elements?.push(task);
                if(this.pageSlice.length<2)
                {
                  this.pageSlice?.push(task);
                }
              })
            }
          )

        }
        else if(this.user.role=='Product Manager'){
          this.listService.getAllIssues().subscribe(
            (response:Issue[])=>{
              response.forEach(issue=>{
                this.elements?.push(issue);
                if(this.pageSlice.length<2)
                {
                  this.pageSlice?.push(issue);
                }
              })
            }
          )
          this.listService.getAllTasks().subscribe(
            (response:Task[])=>{
              response.forEach(task=>{
                this.elements?.push(task);
                if(this.pageSlice.length<2)
                {
                  this.pageSlice?.push(task);
                }
              })
            }
          )

        }
        else if(this.user.role=='Worker'){
          this.listService.getAllTasks().subscribe(
            (response:Task[])=>{
              response.forEach(task=>{
                this.elements?.push(task);
                if(this.pageSlice.length<2)
                {
                  this.pageSlice?.push(task);
                }
              })
            }
          )
        }
      }
    )
  }

  public logout(): void {
    this.router.navigateByUrl('/');
  }

  getId(obj:Request|Issue|Task|User):string{
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
          return (obj as User).login;
        }
        break;
      }
      default: {
        break;
      }
    }
    return '';
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

  getInfo(obj:Request|Issue|Task|User):string[]{
    switch (typeof obj) {
      case 'object': {
        if ('requestName' in obj) {
          return [(obj as Request).status, (obj as Request).type];
        } else if ('issueName' in obj) {
          return [(obj as Issue).status, (obj as Issue).type];
        } else if ('taskName' in obj) {
          return [(obj as Task).status, (obj as Task).type];
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

  public OnPageChange(event:PageEvent) {
    const startIndex = event.pageIndex*event.pageSize;
    let endIndex = startIndex+event.pageSize;
    if(endIndex>this.elements!.length){
      endIndex=this.elements!.length;
    }
    this.pageSlice = this.elements!.slice(startIndex,endIndex);
  }

  editData(id:string, userRole:any)
  {
    if(userRole=="Admin")
    {
      this.openDialog(id,'Edit user', userRole);
    }
    else
      this.openDialog(id,'Edit', userRole);
  }

  addData(userRole:any)
  {
    if(userRole=="Admin") {
      this.openDialog(0, 'Add user', userRole);
    }
    else
      this.openDialog(0, 'Add', userRole);
  }


  openDialog(id:any, title:any, userRole:any)
  {
    var _dialog = this.dialog.open(DialogComponent, {
      width:'40%',
      enterAnimationDuration:'500ms',
      exitAnimationDuration:'500ms',
      data:{
        title: title,
        id: id,
        userRole: userRole
      }
    })
    _dialog.afterClosed().subscribe(item=>{
      this.elements=[];
      this.getData();
    }
    );
  }
}




