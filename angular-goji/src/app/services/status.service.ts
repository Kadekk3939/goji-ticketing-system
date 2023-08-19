import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task';
import { Issue } from '../interfaces/issue';
import { Request } from '../interfaces/request';
import {environment} from "../../environments/environment";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http:HttpClient) { }

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
