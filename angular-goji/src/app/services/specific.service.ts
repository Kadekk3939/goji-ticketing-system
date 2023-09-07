import { Injectable } from '@angular/core';
import {User} from "../interfaces/user";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Request} from "../interfaces/request";
import {Task} from "../interfaces/task";
import {Issue} from "../interfaces/issue";
import {Product} from "../interfaces/product";
import { Client } from '../interfaces/client';

@Injectable({
  providedIn: 'root'
})
export class SpecificService {

  constructor(private http: HttpClient) { }

  public getSubIssuesFromRequest(requestId:string):Observable<Issue[]>{
    return this.http.get<Issue[]>(`${environment.apiBaseUrl}/request/${requestId}/issues`);
  }

  public getSubTasksFromIssue(issueId:string):Observable<Task[]>{
    return this.http.get<Task[]>(`${environment.apiBaseUrl}/issue/${issueId}/tasks`);
  }

  public getSubRequestFromProduct(productId:string):Observable<Request[]>{
    return this.http.get<Request[]>(`${environment.apiBaseUrl}/product/${productId}/requests`);
  }

  public getSubProductFromClient(clientId:string):Observable<Product[]>{
    return this.http.get<Product[]>(`${environment.apiBaseUrl}/client/${clientId}/products`);
  }

  public getParentIssueFromTask(taskId:string):Observable<Issue>{
    return this.http.get<Issue>(`${environment.apiBaseUrl}/task/${taskId}/issue`)
  }

  public getParentRequestFromIssue(issueId:string):Observable<Request>{
    return this.http.get<Request>(`${environment.apiBaseUrl}/issue/${issueId}/request`)
  }

  public getParentProductFromRequest(requestId:string):Observable<Product>{
    return this.http.get<Product>(`${environment.apiBaseUrl}/request/${requestId}/product`)
  }

  public getParentClientFromProduct(productId:string):Observable<Client>{
    return this.http.get<Client>(`${environment.apiBaseUrl}/product/${productId}/client`)
  }

  public getSubElementsForUser(userId:string):Observable<Issue[]|Task[]|Request[]>{
    return this.http.get<Issue[]|Task[]|Request[]>(`${environment.apiBaseUrl}/user/${userId}/subElements`)
  }

  public setUserActiveTrue(userId:string):Observable<User>{
    return this.http.put<User>(`${environment.apiBaseUrl}/user/${userId}/active`,null)
  }

  public setUserActiveFalse(userId:string):Observable<User>{
    return this.http.put<User>(`${environment.apiBaseUrl}/user/${userId}/notActive`,null)
  }
}
