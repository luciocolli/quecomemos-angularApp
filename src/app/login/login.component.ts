import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loading: boolean = false;
  error: boolean = false;
  errorMensaje: string = '';

  constructor(private usuarioService: UsuarioService, 
              private router: Router,
              private authService: AuthService) {}

  onSubmit(): void {
    this.loading = true;
    this.error = false;
    this.usuarioService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        localStorage.setItem('email', this.email);
        this.authService.login(response.token);
        this.loading = false;

        // Redirect to the home page
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Login failed:', error);
        if (error.error && error.error.message) {
          this.errorMensaje = error.error.message; // Extract the custom message
        } else {
          this.errorMensaje = 'Ocurrió un error desconocido. Por favor, inténtelo más tarde.'; // Fallback message
        }
        this.error = true;
        this.loading = false;
      },
    });
  }

  close(): void {
    this.error = false;
  }
}
