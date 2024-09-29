import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/createUser`, user);
  }

  login(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user);
  }
  getOnlyOneUser(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }
  updateUser(userId: number, updatedUser: User): Observable<User> {
    console.log(updatedUser);
    return this.http.put<User>(`${this.apiUrl}/${userId}`, updatedUser);
  }
  
  deleteUser(userId: number, adminUserId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}?adminUserId=${adminUserId}`);
  }
  
  
}
