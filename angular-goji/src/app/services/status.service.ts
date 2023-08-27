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
    return this.http.get<Issue>(`${environment.apiBaseUrl}/issue/${issueId}/close`);
  }

  public setIssueStatusOpen(issueId:string): Observable<Issue> {
    return this.http.get<Issue>(`${environment.apiBaseUrl}/issue/${issueId}/open`);
  }

  public setIssueStatusInProgress(issueId:string): Observable<Issue> {
    return this.http.get<Issue>(`${environment.apiBaseUrl}/issue/${issueId}/inProgress`);
  }

  public setRequestStatusClosed(requestId:string): Observable<Request> {
    return this.http.put<Request>(`${environment.apiBaseUrl}/request/${requestId}/close`,null);
  }

  public setRequestStatusOpen(requestId:string): Observable<Request> {
    return this.http.put<Request>(`${environment.apiBaseUrl}/request/${requestId}/open`, null);
  }

  public setRequestStatusInProgress(requestId:string): Observable<Request> {
    return this.http.put<Request>(`${environment.apiBaseUrl}/request/${requestId}/inProgress`, null);
  }
}
