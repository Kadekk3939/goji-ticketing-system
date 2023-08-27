import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http:HttpClient) { }

  public getUserByLogin(login: string):Observable<User>{
    return this.http.get<User>(`${environment.apiBaseUrl}/user/login/${login}`);
  }
  public getUserById(id: string):Observable<User>{
    return this.http.get<User>(`${environment.apiBaseUrl}/user/${id}`);
  }
}
