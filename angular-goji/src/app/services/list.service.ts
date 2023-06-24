import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Request } from '../interfaces/request';

@Injectable({
  providedIn: 'root'
})
export class ListService {
    private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  public getAllRequests():Observable<Request[]>{
    return this.http.get<Request[]>(`${environment.apiBaseUrl}/request`);
  }
}
