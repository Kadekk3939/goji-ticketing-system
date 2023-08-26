import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AppService } from 'src/app/services/app.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-specific',
  templateUrl: './specific.component.html',
  styleUrls: ['./specific.component.css']
})
export class SpecificComponent implements OnInit{

  elementId: string | undefined;
  type: string|undefined;
  public user:User|undefined;

  constructor(private route: ActivatedRoute,private router: Router,private app:AppService,private userService:UserService){
    this.app.refresh();//In case of refresh
    this.user = this.app.user;
    this.route.params.subscribe(params =>{
      this.elementId=params['id']
      var route=this.router.url
      this.type = route.split('/')[1]
    })
  }

  ngOnInit():void{
    this.getData();
  }

  public logout(): void {
    this.router.navigateByUrl('/');
  }

  public getData(){
    this.userService.getUserByLogin(this.app.login).subscribe(
      (response:User)=>{
        this.user = response;
      });
  }
}
