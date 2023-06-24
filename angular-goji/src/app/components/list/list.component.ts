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

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public users: User[] | undefined;
  public user:User|undefined;
  public elements:Request[]|undefined;
  public pageSlice: (Request|Issue|Task)[]|undefined;
  constructor(private router: Router,private addDialog: MatDialog,private listService:ListService,
    private app:AppService,private userService:UserService) {
      this.app.refresh();//In case of refresh
      this.user = this.app.user;
      this.user = this.app.user;
      this.elements = [];
    }
  ngOnInit() {
    this.userService.getUserByLogin(this.app.login).subscribe(
      (response:User)=>{
        this.user = response;
        if(this.user.role=='Admin'){

          this.listService.getAllRequests().subscribe(
            (response:Request[])=>{
              response.forEach(request=>{
                this.elements?.push(request);
              })
              
            }
          )
          
        }
      }
    )

    
  }

  // public getUsers(): void {
  //   this.listService.getUsers().subscribe(
  //     (response: User[]) => {
  //       this.users = response;
  //       console.log(this.users);
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  // }
  public logout(): void {
    this.router.navigateByUrl('/');
  }

  public OnPageChange(event:PageEvent) {
    const startIndex = event.pageIndex*event.pageSize;
    let endIndex = startIndex+event.pageSize;
    if(endIndex>this.elements!.length){
      endIndex=this.elements!.length;
    }
    this.pageSlice = this.elements!.slice(startIndex,endIndex);
  }

  openAddDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.height = '70%';

    let dialogRef = this.addDialog.open(Dialog, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onClose(){

  }
}

@Component({
  selector: 'app-list',
  templateUrl: 'dialog.html',
})
export class Dialog {
  constructor(
    public dialogRef: MatDialogRef<Dialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {  }

    onNoClick(){
      this.dialogRef.close();
    }
  hide = true;
}


