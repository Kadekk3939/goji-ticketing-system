import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { User } from "src/app/interfaces/user";
import {HttpErrorResponse} from "@angular/common/http";
import {ListService} from "../../services/list.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import { AppService } from 'src/app/services/app.service';
import { Issue } from 'src/app/interfaces/issue';
import { Task } from 'src/app/interfaces/task';
import { UserService } from 'src/app/services/user.service';
import { Request } from 'src/app/interfaces/request';
import {DialogComponent} from "../dialog/dialog.component";
import {FinishDialogComponent} from "../finish-dialog/finish-dialog.component";
import {StatusService} from "../../services/status.service";
import {MatInput} from "@angular/material/input";
import {Client} from "../../interfaces/client";
import {Product} from "../../interfaces/product";
import {Observable, of, shareReplay} from "rxjs";
import {SpecificService} from "../../services/specific.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  value = '';
  selected = '';
  public type:string | undefined;
  public users: User[] | undefined;
  public user:User|undefined;
  public elements:(Request|Issue|Task|User|Client|Product)[];
  public originalElements:(Request|Issue|Task|User|Client|Product)[];
  public pageSlice: (Request|Issue|Task|User|Client|Product)[];
  public statusArray: any[] = [{id:1, name: 'OPEN', checked: false}, {id:2, name: 'CLOSED', checked: false}, {id:3, name: 'IN_PROGRESS', checked: false}];
  public rolesArray: any[] = [{id:1, name: 'Admin', checked: false}, {id:2, name: 'Account Manager', checked: false}, {id:3, name: 'Product Manager', checked: false}, {id:4, name: 'Worker', checked: false}];
  public typesArray: any[] = [{name: 'Bug', checked: false}, {name: 'Feature', checked: false}, {name: 'Update', checked: false}];
  public parentElementsArray: any[] = [];
  tempArray: any = [];
  newArray: any = [];
  numOfChecked: number = 0;
  opendateFValue: any;
  inProgressDateFValue: any;
  closedDateFValue: any;

  @ViewChild('openDate', {read: MatInput}) openDate: any ;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private listService:ListService,
              private app:AppService,
              private userService:UserService,
              private statusService:StatusService,
              private specificService: SpecificService) {
      this.app.refresh();//In case of refresh
      this.user = this.app.user;

      this.elements = [];
      this.originalElements =[];
      this.pageSlice = [];
      this.type=router.url;
    }
  ngOnInit() {
    this.getData();
    this.getParentElements();
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
              this.pageSlice = this.elements!.slice(0,this.paginator?.pageSize);
            }
          )
        }
        else if(this.user.role=='Account Manager'){
          if(this.type=="/users")
          {
            this.router.navigateByUrl('/requests');
          }
          if(this.router.url=="/clients") {
            this.listService.getAllClients().subscribe(
              (response: Client[]) => {
                response.forEach(client => {
                  this.elements?.push(client);
                })
                this.pageSlice = this.elements!.slice(0,this.paginator?.pageSize);
              }
            )
          }
          if(this.router.url=="/products") {
            this.listService.getAllProducts().subscribe(
              (response: Product[]) => {
                response.forEach(product => {
                  this.elements?.push(product);
                })
                this.pageSlice = this.elements!.slice(0,this.paginator?.pageSize);
              }
            )
          }
          if(this.router.url=="/requests") {
            this.listService.getAllRequests().subscribe(
              (response: Request[]) => {
                response.forEach(request => {
                  this.elements?.push(request);
                  this.applyFilters();
                })
               this.pageSlice = this.elements!.slice(0,this.paginator?.pageSize);
              }
            )
          }
          if(this.router.url=="/issues") {
            this.listService.getAllIssues().subscribe(
              (response: Issue[]) => {
                response.forEach(issue => {
                  this.elements?.push(issue);
                  this.applyFilters();
                })
                this.pageSlice = this.elements!.slice(0,this.paginator?.pageSize);
              }
            )
          }
          if(this.router.url=="/tasks") {
            this.listService.getAllTasks().subscribe(
              (response: Task[]) => {
                response.forEach(task => {
                  this.elements?.push(task);
                  this.applyFilters();
                })
                this.pageSlice = this.elements!.slice(0,this.paginator?.pageSize);
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
                  this.applyFilters();
                })
                this.pageSlice = this.elements!.slice(0,this.paginator?.pageSize);
              }
            )
          }
          if(this.router.url=="/tasks") {
            this.listService.getAllTasks().subscribe(
              (response: Task[]) => {
                response.forEach(task => {
                  this.elements?.push(task);
                  this.applyFilters();
                })
               this.pageSlice = this.elements!.slice(0,this.paginator?.pageSize);
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
                this.applyFilters();
              })
              this.pageSlice = this.elements!.slice(0,this.paginator?.pageSize);
            }
          )
        }
      }
    )
    this.originalElements=this.elements;
  }

  public logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('/');
  }

  getObjType(obj:Request|Issue|Task|User|Client|Product):string{
    switch (typeof obj) {
      case 'object': {
        if ('requestName' in obj) {
          return 'request';
        } else if ('issueName' in obj) {
          return 'issue';
        } else if ('taskName' in obj) {
          return 'task';
        }
        else if ('firstName' in obj) {
          return 'user';
        }
        else if ('clientId' in obj) {
          return 'client';
        }
        else if ('productId' in obj) {
          return 'product';
        }
        break;
      }
      default: {
        break;
      }
    }
    return '';
  }

  getId(obj:Request|Issue|Task|User|Client|Product):number{
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
        else if ('name' in obj) {
          return (obj as Client).clientId;
        }
        else if ('productName' in obj) {
          console.log((obj as Product).productId)
          return (obj as Product).productId;
        }
        break;
      }
      default: {
        break;
      }
    }
    return -1;
  }

  getName(obj:Request|Issue|Task|User|Client|Product):string{
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
        else if ('name' in obj) {
          return (obj as Client).name;
        }
        else if ('productName' in obj) {
          return (obj as Product).productName;
        }
        break;
      }
      default: {
        break;
      }
    }
    return '';
  }
  getOpenDate(obj:Request|Issue|Task|User|Client|Product):Date{
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
  getProgressDate(obj:Request|Issue|Task|User|Client|Product):Date{
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

  getFinishDate(obj:Request|Issue|Task|User|Client|Product):Date{
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

  getStatus(obj:Request|Issue|Task|User|Client|Product):string{
    switch (typeof obj) {
      case 'object': {
        if ('requestName' in obj) {
          return (obj as Request).status;
        } else if ('issueName' in obj) {
          return (obj as Issue).status;
        } else if ('taskName' in obj) {
          return (obj as Task).status;
        }
        break;
      }
      default: {
        break;
      }
    }
    return '';
  }

  getInfo(obj:Request|Issue|Task|User|Client|Product):string[]{
    switch (typeof obj) {
      case 'object': {
        if ('requestName' in obj) {
          return [(obj as Request).openDate.toString().slice(0,10), ((obj as Request).inProgressDate||'undefined').toString().slice(0,10), ((obj as Request).finalizationDate||'undefined').toString().slice(0,10)];
        } else if ('issueName' in obj) {
          return [(obj as Issue).openDate.toString().slice(0,10), ((obj as Issue).inProgressDate||'undefined').toString().slice(0,10), ((obj as Issue).finalizationDate||'undefined').toString().slice(0,10)];
        } else if ('taskName' in obj) {
          return [(obj as Task).openDate.toString().slice(0,10), ((obj as Task).inProgressDate||'undefined').toString().slice(0,10), ((obj as Task).finalizationDate||'undefined').toString().slice(0,10)];
        }
        else if ('firstName' in obj) {
          return [(obj as User).login, (obj as User).email, (obj as User).role];
        }
        else if ('name' in obj) {
          return [(obj as Client).email, (obj as Client).phoneNumber];
        }
        else if ('productName' in obj) {
          return [(obj as Product).version, (obj as Product).description];
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
        this.pageSlice = this.elements!.slice(0,this.paginator?.pageSize);
        break;
      case 'openup':
        this.elements.sort((a, b) => new Date(this.getOpenDate(a)).getTime() - new Date(this.getOpenDate(b)).getTime());
        this.pageSlice = this.elements!.slice(0,this.paginator?.pageSize);
        break;
      case 'startdown':
        this.elements.sort((a, b) => new Date(this.getProgressDate(b)).getTime() - new Date(this.getProgressDate(a)).getTime());
        this.pageSlice = this.elements!.slice(0,this.paginator?.pageSize);
        break;
      case 'startup':
        this.elements.sort((a, b) => new Date(this.getProgressDate(a)).getTime() - new Date(this.getProgressDate(b)).getTime());
        this.pageSlice = this.elements!.slice(0,this.paginator?.pageSize);
        break;
      case 'finishdown':
        this.elements.sort((a, b) => new Date(this.getFinishDate(b)).getTime() - new Date(this.getFinishDate(a)).getTime());
        this.pageSlice = this.elements!.slice(0,this.paginator?.pageSize);
        break;
      case 'finishup':
        this.elements.sort((a, b) => new Date(this.getFinishDate(a)).getTime() - new Date(this.getFinishDate(b)).getTime());
        this.pageSlice = this.elements!.slice(0,this.paginator?.pageSize);
        break;
      default:
        this.elements=[];
        this.getData()
        this.pageSlice = this.elements!.slice(0,this.paginator?.pageSize);
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
        this.pageSlice = this.elements!.slice(0,this.paginator?.pageSize);
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
        this.pageSlice = this.elements!.slice(0,this.paginator?.pageSize);
        break;
      default:
        this.elements=[];
        this.getData()
        this.pageSlice = this.elements!.slice(0,this.paginator?.pageSize);
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
    this.paginator?.firstPage()
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

  addData(type:any)
  {
    this.openDialog('Add '+type.slice(1,-1), type);
  }


  openDialog(title:any, type:any)
  {
    this.value='';
    const _dialog = this.dialog.open(DialogComponent, {
      width:'40%',
      enterAnimationDuration:'500ms',
      exitAnimationDuration:'500ms',
      data:{
        title: title,
        id: 0,
        type: type
      }
    })
    _dialog.afterClosed().subscribe(item=>{
      if(item!==undefined) {
        this.router.navigate([type.slice(0, -1), item]);
      }
    });
  }
  openFinishDialog(id:any, obj:Request|Issue|Task|User|Client|Product)
  {
    var _dialog = this.dialog.open(FinishDialogComponent, {
      width:'40%',
      enterAnimationDuration:'500ms',
      exitAnimationDuration:'500ms',
      data:{
        id: id,
        objectType: this.getObjType(obj)
      }
    })
    _dialog.afterClosed().subscribe(item=>{
      if(item!==undefined) {
        this.elements=[];
        this.getData();
      }
    });
  }

  setInProgress(obj:Request|Issue|Task|User|Client|Product) {
    switch (typeof obj) {
      case 'object': {
        if ('requestName' in obj) {
          this.statusService.setRequestStatusInProgress(obj.requestId.toString(), this.user?.login??'').subscribe(res => {
              this.elements=[];
              this.getData();
            },
            (error: HttpErrorResponse) => {
              alert(error.message);
            }
          );
        } else if ('issueName' in obj) {
          this.statusService.setIssueStatusInProgress(obj.issueId.toString(),this.user?.login??'').subscribe(res => {
              this.elements=[];
              this.getData();
            },
            (error: HttpErrorResponse) => {
              alert(error.message);
            }
          );
        } else if ('taskName' in obj) {
          this.statusService.setTaskStatusInProgress(obj.taskId.toString(),this.user?.login??'').subscribe(res => {
              this.elements=[];
              this.getData();
            },
            (error: HttpErrorResponse) => {
              alert(error.message);
            }
          );
        }
        break;
      }
      default: {
        break;
      }
    }
  }

  setOpen(obj:Request|Issue|Task|User|Client|Product) {
    switch (typeof obj) {
      case 'object': {
        if ('requestName' in obj) {
          this.statusService.setRequestStatusOpen(obj.requestId.toString()).subscribe(res => {
              this.elements=[];
              this.getData();
            },
            (error: HttpErrorResponse) => {
              alert(error.message);
            }
          );
        } else if ('issueName' in obj) {
          this.statusService.setIssueStatusOpen(obj.issueId.toString()).subscribe(res => {
              this.elements=[];
              this.getData();
            },
            (error: HttpErrorResponse) => {
              alert(error.message);
            }
          );
        } else if ('taskName' in obj) {
          this.statusService.setTaskStatusOpen(obj.taskId.toString()).subscribe(res => {
              this.elements=[];
              this.getData();
            },
            (error: HttpErrorResponse) => {
              alert(error.message);
            }
          );
        }
        break;
      }
      default: {
        break;
      }
    }
  }

  getParentElements(){
    this.parentElementsArray = [];
    if(this.type=="/requests")
    {
      this.listService.getAllProducts().subscribe(
        (response: Product[]) => {
          response.forEach(product => {
            this.parentElementsArray.push({id: product.productId, name: product.productName, checked: false});
          })
        }
      )
    }else if(this.type=="/issues")
    {
      this.listService.getAllRequests().subscribe(
        (response: Request[]) => {
          response.forEach(request => {
            this.parentElementsArray.push({id: request.requestId, name: request.requestName, checked: false});
          })
        }
      )
    }else if(this.type=="/tasks")
    {
      this.listService.getAllIssues().subscribe(
        (response: Issue[]) => {
          response.forEach(issue => {
            this.parentElementsArray.push({id: issue.issueId, name: issue.issueName, checked: false});
          })
        }
      )
    }


  }

  onFilterCheckboxChange(event: any){
    // if(event.target.checked){

      if(event.target.value == 'OPEN'){
        this.statusArray[0].checked = !this.statusArray[0].checked;
      }else if(event.target.value == 'CLOSED'){
        this.statusArray[1].checked = !this.statusArray[1].checked;
      }else if(event.target.value == 'IN_PROGRESS'){
        this.statusArray[2].checked = !this.statusArray[2].checked;
      }else if(event.target.value == 'Admin'){
        this.rolesArray[0].checked = !this.rolesArray[0].checked;
      }else if(event.target.value == 'Account Manager'){
        this.rolesArray[1].checked = !this.rolesArray[1].checked;
      }else if(event.target.value == 'Product Manager'){
        this.rolesArray[2].checked = !this.rolesArray[2].checked;
      }else if(event.target.value == 'Worker'){
        this.rolesArray[3].checked = !this.rolesArray[3].checked;
      }
  }
  onParentsCheckboxChange(event: any){
    for(let i = 0; i < this.parentElementsArray.length; i++){
      if(event.target.value == this.parentElementsArray[i].id){
        this.parentElementsArray[i].checked = !this.parentElementsArray[i].checked;
      }
    }
  }
  onTypesCheckboxChange(event: any){
    for(let i = 0; i < this.typesArray.length; i++){
      if(event.target.value == this.typesArray[i].name){
        this.typesArray[i].checked = !this.typesArray[i].checked;
      }
    }
  }
  onFilterDateChange(event: any, mode: string){

    const pick = new Date(new Date(event.value.toISOString()).getTime()).setUTCHours(24,0,0,0);
    switch (mode) {
      case 'open': {
        this.opendateFValue = event.value;
        // this.elements = this.originalElements.filter((e: any) =>
        //   new Date(new Date(new Date(e.openDate).toISOString()).getTime()).setUTCHours(0,0,0,0) == pick);
        break;}
      case 'inProgress': {
        this.inProgressDateFValue = event.value;
        // this.elements = this.originalElements.filter((e: any) =>
        //   new Date(new Date(new Date(e.inProgressDate).toISOString()).getTime()).setUTCHours(0,0,0,0) == pick);
        break;}
      case 'finalization': {
        this.closedDateFValue = event.value;
        // this.elements = this.originalElements.filter((e: any) =>
        //   new Date(new Date(new Date(e.finalizationDate).toISOString()).getTime()).setUTCHours(0,0,0,0) == pick);
        break;}
      default: break;
    }

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
  onClearDateFilter(event: any, mode: string){
    event.stopPropagation();
    switch (mode) {
      case 'open': {
        this.opendateFValue = null;
        break;
      }
      case 'inProgress': {
        this.inProgressDateFValue = null;
        break;
      }
      case 'close': {
        this.closedDateFValue = null;
        break;
      }
      default:
        break;
    }
  }

  applyFilters(){
    this.elements = this.originalElements;
    // @ts-ignore
    if(this.user.role=='Admin'){
      this.elements = [];
      for(let i = 0; i < this.rolesArray.length; i++){
        if(this.rolesArray[i].checked == true){
          this.tempArray = this.originalElements.filter((e: any)=> e.role == this.rolesArray[i].name);
          this.newArray = [];
          this.newArray.push(this.tempArray);
          for(let i = 0; i < this.newArray.length; i++){
            for(let j = 0; j < this.newArray[i].length; j++){
              const obj = this.newArray[i][j];
              this.elements.push(obj);
            }
          }
        }
      }
    } else{

      let parArrCh = 0;
      for (let i = 0; i < this.parentElementsArray.length; i++){
        if (this.parentElementsArray[i].checked)
          parArrCh++;
      }
      let typeArrCh = 0;
      for (let i = 0; i < this.typesArray.length; i++){
        if (this.typesArray[i].checked)
          typeArrCh++;
      }

      if(this.statusArray[0].checked || this.statusArray[1].checked || this.statusArray[2].checked) {
        this.elements = [];
        for (let i = 0; i < this.statusArray.length; i++) {
          if (this.statusArray[i].checked == true) {

            // this.elements = this.originalElements.filter((e:any) => e.status == this.statusArray[i].name);

            this.tempArray = this.originalElements.filter((e: any) => e.status == this.statusArray[i].name);

            this.newArray = [];
            this.newArray.push(this.tempArray);
            for (let i = 0; i < this.newArray.length; i++) {
              for (let j = 0; j < this.newArray[i].length; j++) {
                const obj = this.newArray[i][j];
                this.elements.push(obj);
              }
            }

          }
        }
      }

      if(parArrCh > 0){
        this.newArray = [];
        for (let i = 0; i < this.parentElementsArray.length; i++) {
          if (this.parentElementsArray[i].checked == true) {
            this.tempArray = this.elements.filter((e:any) => e.productId == this.parentElementsArray[i].id || e.requestId == this.parentElementsArray[i].id || e.issueId == this.parentElementsArray[i].id);
            this.newArray.push(this.tempArray);
          }
        }
        this.elements = [];
        for (let i = 0; i < this.newArray.length; i++) {
          for (let j = 0; j < this.newArray[i].length; j++) {
            const obj = this.newArray[i][j];
            this.elements.push(obj);
          }
        }
      }

      if(typeArrCh > 0){
        this.newArray = [];
        for (let i = 0; i < this.typesArray.length; i++) {
          if (this.typesArray[i].checked == true) {
            this.tempArray = this.elements.filter((e:any) => e.type == this.typesArray[i].name);
            this.newArray.push(this.tempArray);
          }
        }
        this.elements = [];
        for (let i = 0; i < this.newArray.length; i++) {
          for (let j = 0; j < this.newArray[i].length; j++) {
            const obj = this.newArray[i][j];
            this.elements.push(obj);
          }
        }
      }
      // else{
      //   this.elements = this.originalElements;
      // }

      if(this.opendateFValue != null) {
        const pick = new Date(new Date(this.opendateFValue.toISOString()).getTime()).setUTCHours(24,0,0,0);
          this.elements = this.elements.filter((e: any) =>
            new Date(new Date(new Date(e.openDate).toISOString()).getTime()).setUTCHours(0,0,0,0) == pick);
      }
      if(this.inProgressDateFValue != null) {
        const pick = new Date(new Date(this.inProgressDateFValue.toISOString()).getTime()).setUTCHours(24,0,0,0);

        this.elements = this.elements.filter((e: any) =>
            new Date(new Date(new Date(e.inProgressDate).toISOString()).getTime()).setUTCHours(0,0,0,0) == pick);
      }
      if(this.closedDateFValue != null) {
        const pick = new Date(new Date(this.closedDateFValue.toISOString()).getTime()).setUTCHours(24,0,0,0);

        this.elements = this.elements.filter((e: any) =>
            new Date(new Date(new Date(e.finalizationDate).toISOString()).getTime()).setUTCHours(0,0,0,0) == pick);
      }


    }

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

  clearFilters(){

    this.opendateFValue = null;
    this.inProgressDateFValue = null;
    this.closedDateFValue = null;
    this.elements = this.originalElements;

    let checkboxEl = (<HTMLInputElement[]><any>document.getElementsByName("statusChbx"));
    for(let i = 0; i < checkboxEl.length; i++){
      if (checkboxEl[i].checked) {
        checkboxEl[i].checked = false
      }
      this.statusArray[i].checked = false;
    }
    let parCheckboxEl = (<HTMLInputElement[]><any>document.getElementsByName("parentsChbx"));
    for(let i = 0; i < parCheckboxEl.length; i++){
      if (parCheckboxEl[i].checked) {
        parCheckboxEl[i].checked = false
      }
      this.parentElementsArray[i].checked = false;
    }

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

}




