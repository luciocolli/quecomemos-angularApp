import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [CommonModule],
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isLoggedIn = false;

  constructor(private router: Router, 
              private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      console.log('HomeComponent: User is logged in:', loggedIn);
      this.isLoggedIn = loggedIn;
    });
  }

  goToMenus() {
    this.router.navigate(['/menus']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  } 

}
