import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { User } from 'src/app/interfaces/user';
import { AppService } from 'src/app/services/app.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  user:User | undefined;
  constructor( private router: Router,private app:AppService,private userService:UserService) {
    this.app.refresh();//In case of refresh
    this.user = this.app.user;
  }

  ngOnInit(){
    this.userService.getUserByLogin(this.app.login).subscribe(
      (response:User)=>{
        this.user = response;
      }
    )
  }

  public logout(): void {
    this.router.navigateByUrl('/');
  }
}
