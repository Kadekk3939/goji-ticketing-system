import { Injectable } from '@angular/core';
import {User} from "../interfaces/user";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Request} from "../interfaces/request";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private http:HttpClient) { }

  public addUser(user:User): Observable<User>{
    return this.http.post<User>(`${environment.apiBaseUrl}/user`, user);
  }

  public getUserByLogin(id:string):Observable<User>{
    return this.http.get<User>(`${environment.apiBaseUrl}/user/login/${id}`);
  }

  public updateUser(user:User): Observable<User> {
    return this.http.post<User>(`${environment.apiBaseUrl}/user`, user);
  }

}
