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
export class DialogService {

  constructor(private http:HttpClient) { }

  public addUser(user:User): Observable<any>{
    return this.http.post<User>(`${environment.apiBaseUrl}/user`, user);
  }

  public addClient(client: Client): Observable<Client>{
    return this.http.post<Client>(`${environment.apiBaseUrl}/client`, client);
  }

  public addProduct(product: Product): Observable<Product>{
    return this.http.post<Product>(`${environment.apiBaseUrl}/product`, product);
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

  public getProductById(id:string):Observable<Product>{
    return this.http.get<Product>(`${environment.apiBaseUrl}/product/${id}`);
  }

  public updateProduct(productId:string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${environment.apiBaseUrl}/product/${productId}`, product);
  }

  public getClientById(id:string):Observable<Client>{
    return this.http.get<Client>(`${environment.apiBaseUrl}/client/${id}`);
  }

  public updateClient(clientId:string, client:Client): Observable<Client> {
    return this.http.put<Client>(`${environment.apiBaseUrl}/client/${clientId}`, client);
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

  public getAllRequests():Observable<Request[]>{
    return this.http.get<Request[]>(`${environment.apiBaseUrl}/request`);
  }

  public getAllIssues():Observable<Issue[]>{
    return this.http.get<Issue[]>(`${environment.apiBaseUrl}/issue`);
  }

  public getAllProducts():Observable<Product[]>{
    return this.http.get<Product[]>(`${environment.apiBaseUrl}/product`);
  }

  public getAllClients():Observable<Client[]>{
    return this.http.get<Client[]>(`${environment.apiBaseUrl}/client`);
  }

  public getAllUsers():Observable<User[]>{
    return this.http.get<User[]>(`${environment.apiBaseUrl}/user`);
  }

  public getUsersWithRole(role:string):Observable<User[]>{
    return this.http.get<User[]>(`${environment.apiBaseUrl}/user/role/${role}`);
  }
}
