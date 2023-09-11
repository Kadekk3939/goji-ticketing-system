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

  public setTaskStatusClosed(taskId:string, result:string): Observable<Task> {
    return this.http.put<Task>(`${environment.apiBaseUrl}/task/${taskId}/close`,result);
  }

  public setTaskStatusOpen(taskId:string): Observable<Task> {
    return this.http.put<Task>(`${environment.apiBaseUrl}/task/${taskId}/open`, null);
  }

  public setTaskStatusInProgress(taskId:string, userLogin:string): Observable<Task> {
    return this.http.put<Task>(`${environment.apiBaseUrl}/task/${taskId}/inProgress`, userLogin);
  }

  public setTaskStatusCancel(taskId:string, result:string): Observable<Task> {
    return this.http.put<Task>(`${environment.apiBaseUrl}/task/${taskId}/cancel`, result);
  }

  public setIssueStatusClosed(issueId:string, result:string): Observable<Issue> {
    return this.http.put<Issue>(`${environment.apiBaseUrl}/issue/${issueId}/close`, result);
  }

  public setIssueStatusOpen(issueId:string): Observable<Issue> {
    return this.http.put<Issue>(`${environment.apiBaseUrl}/issue/${issueId}/open`, null);
  }

  public setIssueStatusCancel(issueId:string, result:string): Observable<Issue> {
    return this.http.put<Issue>(`${environment.apiBaseUrl}/issue/${issueId}/cancel`, result);
  }

  public setIssueStatusInProgress(issueId:string, userLogin:string): Observable<Issue> {
    return this.http.put<Issue>(`${environment.apiBaseUrl}/issue/${issueId}/inProgress`, userLogin);
  }

  public setRequestStatusClosed(requestId:string, result:string): Observable<Request> {
    return this.http.put<Request>(`${environment.apiBaseUrl}/request/${requestId}/close`, result);
  }

  public setRequestStatusOpen(requestId:string): Observable<Request> {
    return this.http.put<Request>(`${environment.apiBaseUrl}/request/${requestId}/open`, null);
  }

  public setRequestStatusCancel(requestId:string, result:string): Observable<Request> {
    return this.http.put<Request>(`${environment.apiBaseUrl}/request/${requestId}/cancel`, result);
  }

  public setRequestStatusInProgress(requestId:string, userLogin:string): Observable<Request> {
    return this.http.put<Request>(`${environment.apiBaseUrl}/request/${requestId}/inProgress`, userLogin);
  }
}
