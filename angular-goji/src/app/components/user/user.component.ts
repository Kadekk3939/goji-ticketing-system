import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { Issue } from 'src/app/interfaces/issue';
import { Task } from 'src/app/interfaces/task';
import { User } from 'src/app/interfaces/user';
import { AppService } from 'src/app/services/app.service';
import { UserService } from 'src/app/services/user.service';
import { Request } from 'src/app/interfaces/request';
import { SpecificService } from 'src/app/services/specific.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  user:User | undefined;
  subElements: (Request|Task|Issue|null)[]
  constructor( private router: Router,private app:AppService,private userService:UserService,private spceificService:SpecificService) {
    this.app.refresh();//In case of refresh
    this.user = this.app.user;
    this.subElements=[]
  }

  ngOnInit(){
    this.userService.getUserByLogin(this.app.login).subscribe(
      (response:User)=>{

        this.user = response;

        this.spceificService.getSubElementsForUser(this.user.userId.toString()).subscribe(
          (response:Issue[]|Task[]|Request[])=>{

            this.subElements=response;
          }
        )
      }
    )
  }

  public logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('/');
  }

  public getSubElementInfo(obj:Request|Issue|Task|null):string[]{
    if(obj!=null){
      if('requestName' in obj){
        return ['Request',
            (obj as Request).requestName,
            (obj as Request).description,
            (obj as Request).status,
            (obj as Request).requestId.toString()];
      }
      else if('issueName' in obj){
        return ['Issue',
            (obj as Issue).issueName,
            (obj as Issue).description,
            (obj as Issue).status,
            (obj as Issue).issueId.toString()];
      }
      else if('taskName' in obj){
        return ['Task',
            (obj as Task).taskName,
            (obj as Task).description,
            (obj as Task).status,
            (obj as Task).issueId.toString()];
      }
      else return['']
    }
    else return['']
  }

  toSubElement(id:string,obj:Request|Issue|Task|null){

    if(obj!=null){
      if('requestName' in obj){
        this.router.navigate(['/request/'+(obj as Request).requestId])
      }
      else if('issuName' in obj){
        this.router.navigate(['/issue/'+(obj as Issue).issueId]);
      }
      else if('taskName' in obj){
        this.router.navigate(['/task/'+(obj as Task).taskId]);
      }
      return of(null)
    }
    return of(null)
  }
}
