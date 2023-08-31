import { Injectable } from '@angular/core';
import {User} from "../interfaces/user";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Request} from "../interfaces/request";
import {Task} from "../interfaces/task";
import {Issue} from "../interfaces/issue";
import {Product} from "../interfaces/product";

@Injectable({
  providedIn: 'root'
})
export class SpecificService {

  constructor(private http: HttpClient) { }

  public getSubIssuesFromRequest(requestId:number):Observable<Issue[]>{
    return this.http.get<Issue[]>(`${environment.apiBaseUrl}/request/${requestId}/issues`);
  }
}
