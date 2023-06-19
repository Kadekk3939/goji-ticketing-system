import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { User } from 'src/app/interfaces/user';
import { AppService } from 'src/app/services/app.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { login: '', password: '' };
  authenticatied: boolean = false
  constructor(private router: Router,private app:AppService,private userService:UserService) {
  }

  login() {
    localStorage.clear()
    this.app.authenticate(this.credentials, () => {
      this.router.navigateByUrl('/user');
    });
    return false;
  }
}
