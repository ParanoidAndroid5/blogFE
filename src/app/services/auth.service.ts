import { Injectable } from '@angular/core';
import { Blog } from '../models/blog';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  
  getCurrentUserId(): number {
    //  localStorage 
    const userId = localStorage.getItem('userId');
    return userId ? +userId : 0; 
  }
  getCurrentusername(): string {
    const username = localStorage.getItem('username'); 
    console.log(username);
    return username ? username : ''; 
  }

  isAdmin(): boolean {
    return this.getCurrentUserId() === 1;
  }

  checkLoginStatus(): boolean {
    return this.getCurrentUserId() !== 0; // Giriş yapmışsa true dön 
}

isAuthenticated(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      observer.next(this.checkLoginStatus());
      
    });
  }

}
