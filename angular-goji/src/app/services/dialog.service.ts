import { Injectable } from '@angular/core';
import {User} from "../interfaces/user";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Request} from "../interfaces/request";
import {Task} from "../interfaces/task";
import {Issue} from "../interfaces/issue";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private http:HttpClient) { }

  public addUser(user:User): Observable<User>{
    return this.http.post<User>(`${environment.apiBaseUrl}/user`, user);
  }

  public addRequest(request:Request): Observable<Request>{
    return this.http.post<Request>(`${environment.apiBaseUrl}/request`, request);
  }

  public addIssue(issue:Issue): Observable<Issue>{
    return this.http.post<Issue>(`${environment.apiBaseUrl}/issue`, issue);
  }

  public addTask(task:Task): Observable<Task>{
    return this.http.post<Task>(`${environment.apiBaseUrl}/task`, task);
  }

  public getUserById(id:string):Observable<User>{
    return this.http.get<User>(`${environment.apiBaseUrl}/user/${id}`);
  }

  public updateUser(id:string, user:User): Observable<User> {
    return this.http.put<User>(`${environment.apiBaseUrl}/user/${id}`, user);
  }

  public updateRequest(request:Request): Observable<Request> {
    return this.http.put<Request>(`${environment.apiBaseUrl}/request/update`, request);
  }

  public updateIssue(issue:Issue): Observable<Issue> {
    return this.http.put<Issue>(`${environment.apiBaseUrl}/issue/update`, issue);
  }

  public updateTask(task:Task): Observable<Task> {
    return this.http.put<Task>(`${environment.apiBaseUrl}/task/update`, task);
  }

}
