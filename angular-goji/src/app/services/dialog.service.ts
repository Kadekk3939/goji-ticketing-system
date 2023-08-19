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

  public getRequestById(requestId:string):Observable<Request>{
    return this.http.get<Request>(`${environment.apiBaseUrl}/request/${requestId}`);
  }

  public updateRequest(requestId:string, request:Request): Observable<Request> {
    return this.http.put<Request>(`${environment.apiBaseUrl}/request/${requestId}`, request);
  }

  public getIssueById(issueId:string):Observable<Issue>{
    return this.http.get<Issue>(`${environment.apiBaseUrl}/issue/${issueId}`);
  }

  public updateIssue(issueId:string, issue:Issue): Observable<Issue> {
    return this.http.put<Issue>(`${environment.apiBaseUrl}/issue/${issueId}`, issue);
  }

  public getTaskById(taskId:string):Observable<Task>{
    return this.http.get<Task>(`${environment.apiBaseUrl}/task/${taskId}`);
  }

  public updateTask(taskId:string, task:Task): Observable<Task> {
    return this.http.put<Task>(`${environment.apiBaseUrl}/task/${taskId}`, task);
  }

  public setTaskStatusClosed(taskId:string): Observable<Task> {
    return this.http.put<Task>(`${environment.apiBaseUrl}/task/${taskId}/close`,null);
  }

  public setTaskStatusOpen(taskId:string): Observable<Task> {
    return this.http.put<Task>(`${environment.apiBaseUrl}/task/${taskId}/open`, null);
  }

  public setTaskStatusInProgress(taskId:string): Observable<Task> {
    return this.http.put<Task>(`${environment.apiBaseUrl}/task/${taskId}/inProgress`, null);
  }

  public setIssueStatusClosed(issueId:string): Observable<Issue> {
    return this.http.put<Issue>(`${environment.apiBaseUrl}/issue/${issueId}/close`,null);
  }

  public setIssueStatusOpen(issueId:string): Observable<Issue> {
    return this.http.put<Issue>(`${environment.apiBaseUrl}/issue/${issueId}/open`, null);
  }

  public setIssueStatusInProgress(issueId:string): Observable<Issue> {
    return this.http.put<Issue>(`${environment.apiBaseUrl}/task/${issueId}/inProgress`, null);
  }

  public setRequestStatusClosed(requestId:string): Observable<Request> {
    return this.http.put<Request>(`${environment.apiBaseUrl}/task/${requestId}/close`,null);
  }

  public setRequestStatusOpen(requestId:string): Observable<Request> {
    return this.http.put<Request>(`${environment.apiBaseUrl}/task/${requestId}/open`, null);
  }

  public setRequestStatusInProgress(requestId:string): Observable<Request> {
    return this.http.put<Request>(`${environment.apiBaseUrl}/task/${requestId}/inProgress`, null);
  }

}
