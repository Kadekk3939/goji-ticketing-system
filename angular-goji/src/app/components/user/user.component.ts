import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { User } from 'src/app/interfaces/user';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  user:User | undefined;
  constructor( private router: Router,private app:AppService) {
    this.app.refresh();//In case of refresh
    this.user = this.app.user;
    console.log(this.user?.firstName);
  }
  public logout(): void {
    this.router.navigateByUrl('/');
  }
}
