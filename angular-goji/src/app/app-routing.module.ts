import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserComponent} from "./components/user/user.component";
import {ListComponent} from "./components/list/list.component";

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path:'user', component: UserComponent},
  {path: 'users', component:ListComponent},
  {path: 'requests', component:ListComponent},
  {path: 'issues', component:ListComponent},
  {path: 'tasks', component:ListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
