import { Injectable } from '@angular/core';

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

  isAdmin(): boolean {
    return this.getCurrentUserId() === 1;
  }

  checkLoginStatus(): boolean {
    return this.getCurrentUserId() !== 0; // Giriş yapmışsa true dön 
}
}
