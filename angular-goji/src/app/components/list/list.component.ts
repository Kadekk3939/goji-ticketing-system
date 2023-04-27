import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import { User } from "src/app/interfaces/user";
import {MatTableDataSource} from "@angular/material/table";
import {HttpErrorResponse} from "@angular/common/http";
import {ListService} from "../../services/list.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public users: User[] | undefined;
  public elements = ['Element1', 'Element2','Element3', 'Element4','Element5', 'Element6'];
  public pageSlice = this.elements.slice(0,2);
  constructor(private router: Router) {}
  ngOnInit() {
    //this.getUsers();

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
    if(endIndex>this.elements.length){
      endIndex=this.elements.length;
    }
    this.pageSlice = this.elements.slice(startIndex,endIndex);
  }

}



