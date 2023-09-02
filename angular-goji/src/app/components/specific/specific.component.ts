import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Issue } from 'src/app/interfaces/issue';
import { Task } from 'src/app/interfaces/task';
import { User } from 'src/app/interfaces/user';
import { Request } from 'src/app/interfaces/request';
import { AppService } from 'src/app/services/app.service';
import { UserService } from 'src/app/services/user.service';
import { DialogService } from 'src/app/services/dialog.service';
import { Observable, forkJoin, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import {DialogComponent} from "../dialog/dialog.component";
import { Product } from 'src/app/interfaces/product';
import { Client } from 'src/app/interfaces/client';
import { SpecificService } from 'src/app/services/specific.service';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-specific',
  templateUrl: './specific.component.html',
  styleUrls: ['./specific.component.css']
})
export class SpecificComponent implements OnInit{

  elementId: string | undefined;
  type: string|undefined;
  public user:User|undefined;
  element: (User|Issue|Task|Request|null);
  subElements: (Product|Request|Task|Issue|null)[]
  parentElement:(Client|Product|Request|Issue|null)
  public info:String[];
  value = '';

  constructor(private route: ActivatedRoute,private router: Router,private app:AppService,private userService:UserService,
    private dialogService:DialogService,private dialog: MatDialog,private specificService:SpecificService,private generalService:DialogService){
    this.app.refresh();//In case of refresh
    this.user = this.app.user;
    this.info=[];
    this.subElements=[]
    this.parentElement=null;
    this.element=null;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.elementId = params['id'];
      const route = this.router.url;
      this.type = route.split('/')[1];
  
      // Use forkJoin to wait for multiple observables to complete
      forkJoin([
        this.userService.getUserByLogin(this.app.login),
        this.getData(),
        this.getSubElements(),
        this.getParentElement()
      ]).subscribe(([user, element, subElements,parentElement]) => {
        this.user = user;
        this.element = element;
        
        if (subElements !== null) {
          this.subElements = subElements;
        } else {
          this.subElements = [];
        }
        if (parentElement !== null) {
          this.parentElement = parentElement;
        } else {
          this.parentElement = null;
        }

        this.info = this.getInfo();
      });
      
    });
  }

public getParentElementInfo():string[]{
  if(this.element!=null){
    switch (typeof this.element) {
      case 'object': {
        if ('requestName' in this.element) {
          return ['Product',(this.parentElement as Product).productName,
            (this.parentElement as Product).description,(this.parentElement as Product).version,(this.parentElement as Product).productId.toString()];
        } else if ('issueName' in this.element) {
          return ['Request',(this.parentElement as Request).requestName,
            (this.parentElement as Request).description,(this.parentElement as Request).status,(this.parentElement as Request).requestId.toString()];
        }
        else if ('taskName' in this.element) {
          return ['Issue',(this.parentElement as Issue).issueName, (this.parentElement as Issue).description, (this.parentElement as Issue).status, 
            (this.parentElement as Issue).issueId.toString()];
        }
        break;
      }
      default: {
        break;
      }
    }
  }
  return [''];
}

public getParentElement():Observable<Product|Issue|Request|Client|null>{
  if (this.type == "issue") {
    return this.specificService.getParentRequestFromIssue(this.elementId!);}
  else if (this.type == "task") {
    return this.specificService.getParentIssueFromTask(this.elementId!);}
    else if (this.type == "request") {
      return this.specificService.getParentProductFromRequest(this.elementId!);}
  // } else if (this.type == "request") {
  //   return this.generalService.getProductById((this.element as Request).productId.toString());
  // }else if (this.type == "task") {
  //   return this.generalService.getIssueById((this.element as Task).issueId.toString());
  // // } else if (this.type == "task") {
  // //   return this.specificService.getTaskById(this.elementId!);
  // } 
  else {
    return of(null); // Handle unknown types or return an empty observable
  }
}

public getSubElementInfo(obj:Request|Issue|Task|Product|null):string[]{
  if(this.element!=null){
    switch (typeof this.element) {
      case 'object': {
        if ('requestName' in this.element) {
          return ['Issue',(obj as Issue).issueName,
            (obj as Issue).description,(obj as Issue).status,(obj as Issue).issueId.toString()];
        } else if ('issueName' in this.element) {
          return ['Task',(obj as Task).taskName,
            (obj as Task).description,(obj as Task).status,(obj as Task).taskId.toString()];
        }
        else if ('firstName' in this.element) {
          return [(this.element as User).userId.toString(), (this.element as User).firstName, (this.element as User).lastName, 
            (this.element as User).login, (this.element as User).email, (this.element as User).role];
        }
        break;
      }
      default: {
        break;
      }
    }
  }
  return [''];
}

  public getSubElements():Observable<Product[]|Issue[]|Request[]|Task[]|null>{
    // if (this.type == "user") {
    //   return this.userService.getUserById(this.elementId!);
    // } else 
    if (this.type == "issue") {
      return this.specificService.getSubTasksFromIssue(this.elementId!);
    } else if (this.type == "request") {
      return this.specificService.getSubIssuesFromRequest(this.elementId!);
    // } else if (this.type == "task") {
    //   return this.specificService.getTaskById(this.elementId!);
    } else {
      return of(null); // Handle unknown types or return an empty observable
    }
  }

  public getData(): Observable<User | Issue | Task | Request|null> {
    if (this.type == "user") {
      return this.userService.getUserById(this.elementId!);
    } else if (this.type == "issue") {
      return this.dialogService.getIssueById(this.elementId!);
    } else if (this.type == "request") {
      return this.dialogService.getRequestById(this.elementId!);
    } else if (this.type == "task") {
      return this.dialogService.getTaskById(this.elementId!);
    } else {
      return of(null); // Handle unknown types or return an empty observable
    }
  }

  public getInfo():string[]{
    if(this.element!=null){
      switch (typeof this.element) {
        case 'object': {
          if ('requestName' in this.element) {
            return [(this.element as Request).requestId.toString(),(this.element as Request).requestName,
              (this.element as Request).description,(this.element as Request).result,(this.element as Request).status,
              (this.element as Request).type,
              (this.element as Request).openDate.toString().slice(0,10), 
              ((this.element as Request).inProgressDate||'none').toString().slice(0,10), 
              ((this.element as Request).finalizationDate||'none').toString().slice(0,10)];
          } else if ('issueName' in this.element) {
            return [(this.element as Issue).issueId.toString(),(this.element as Issue).issueName,
              (this.element as Issue).description,(this.element as Issue).result,(this.element as Issue).status,
              (this.element as Issue).type,
              (this.element as Issue).openDate.toString().slice(0,10), 
              ((this.element as Issue).inProgressDate||'none').toString().slice(0,10), 
              ((this.element as Issue).finalizationDate||'none').toString().slice(0,10)];
          } else if ('taskName' in this.element) {
            return [(this.element as Task).taskId.toString(),(this.element as Task).taskName,
              (this.element as Task).description,(this.element as Task).result,(this.element as Task).status,
              (this.element as Task).type,
              (this.element as Task).openDate.toString().slice(0,10), 
              ((this.element as Task).inProgressDate||'none').toString().slice(0,10), 
              ((this.element as Task).finalizationDate||'none').toString().slice(0,10)];
          }
          else if ('firstName' in this.element) {
            return [(this.element as User).userId.toString(), (this.element as User).firstName, (this.element as User).lastName, 
              (this.element as User).login, (this.element as User).email, (this.element as User).role];
          }
          break;
        }
        default: {
          break;
        }
      }
    }
    return [''];
  }

  public logout(): void {
    this.router.navigateByUrl('/');
  }

  editData(id:any, type:any)
  {
    if(type=="user")
    {
      this.openDialog(id,'Edit user', type);
    }
    else{
      this.openDialog(id,'Edit', type);
    }
  }

  openDialog(id:any, title:any, type:any)
  {
    this.value='';
    console.log(id+' '+title+' '+type)
    var _dialog = this.dialog.open(DialogComponent, {
      width:'40%',
      enterAnimationDuration:'500ms',
      exitAnimationDuration:'500ms',
      data:{
        title: title,
        id: id,
        type: '/'+type+'s'
      }
    })
    _dialog.afterClosed().subscribe(item=>{
      if(item!==undefined) {
        this.ngOnInit();
      }
    });
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

  toParent(id:string){
    if(this.type=='issue' && this.user?.role=='Account Manager')
      this.router.navigate(['/request/'+id]); // Navigate to the 'home' route
    if(this.type=='task' &&(this.user?.role=='Account Manager' || this.user?.role=='Product Manager'))
      this.router.navigate(['/issue/'+id]); // Navigate to the 'home' route
  }

  toSubElement(id:string){
    if(this.type=='issue')
      this.router.navigate(['/task/'+id]); // Navigate to the 'home' route
    if(this.type=='request')
      this.router.navigate(['/issue/'+id]); // Navigate to the 'home' route
  }
}
