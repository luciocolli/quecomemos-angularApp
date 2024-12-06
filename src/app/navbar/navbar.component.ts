import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLoggedIn = false;

  constructor(private router: Router,
              private authService: AuthService,
  ) {}

  ngOnInit(): void {
    // Subscribe to the authentication state
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToMenus() {
    this.router.navigate(['/menus']);
  }

  goToComidas() {
    this.router.navigate(['/comidas']);
  }

  goToRegister() {
    this.router.navigate(['/registrarUsuario']);
  }

  goToEditarPerfil() {
    this.router.navigate(['/editarPerfil']);
  }

}
