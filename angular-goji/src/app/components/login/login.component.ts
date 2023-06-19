import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { AppService } from 'src/app/services/app.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { login: '', password: '' };
  authenticatied: boolean = false
  constructor(private router: Router,private app:AppService) {
  }
  
  login() {
    localStorage.clear()
    this.app.authenticate(this.credentials, () => {
      this.router.navigateByUrl('/user');
    });
    return false;
  }
}
