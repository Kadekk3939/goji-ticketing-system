import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  constructor( private router: Router) {}
  public logout(): void {
    this.router.navigateByUrl('/');
  }
}
