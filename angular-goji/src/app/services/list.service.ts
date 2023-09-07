import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Request } from '../interfaces/request';
import { Issue } from '../interfaces/issue';
import { Task } from '../interfaces/task';
import {User} from "../interfaces/user";
import {Client} from "../interfaces/client";
import {Product} from "../interfaces/product";

@Injectable({
  providedIn: 'root'
})
export class ListService {
    private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  public getAllRequests():Observable<Request[]>{
    return this.http.get<Request[]>(`${environment.apiBaseUrl}/request`);
  }

  public getAllIssues():Observable<Issue[]>{
    return this.http.get<Issue[]>(`${environment.apiBaseUrl}/issue`);
  }

  public getAllTasks():Observable<Task[]>{
    return this.http.get<Task[]>(`${environment.apiBaseUrl}/task`);
  }

  public getAllUsers():Observable<User[]>{
    return this.http.get<User[]>(`${environment.apiBaseUrl}/user`);
  }

  public getAllClients():Observable<Client[]>{
    return this.http.get<Client[]>(`${environment.apiBaseUrl}/client`);
  }

  public getAllProducts():Observable<Product[]>{
    return this.http.get<Product[]>(`${environment.apiBaseUrl}/product`);
  }
}
