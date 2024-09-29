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
  getCurrentuserName(): string {
    const username = localStorage.getItem('userName'); 
    return username ? username : ''; 
  }

  isAdmin(): boolean {
    return this.getCurrentUserId() === 1;
  }

  checkLoginStatus(): boolean {
    return this.getCurrentUserId() !== 0; // Giriş yapmışsa true dön 
}

}
