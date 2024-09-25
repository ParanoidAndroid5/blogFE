import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  constructor(private router: Router) {} 

  checkLoginStatus(): void {
    const userId = localStorage.getItem('userId');
    this.isLoggedIn = userId !== null; 
  }

  onLogout(): void {
    localStorage.removeItem('userId'); 
    this.isLoggedIn = false; 
    this.router.navigate(['/login']); 
  }
  
}
