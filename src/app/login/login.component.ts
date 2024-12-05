import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormsModule],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  onSubmit(): void {
    this.usuarioService.login(this.email, this.password).subscribe(
      (response) => {
        // Handle successful login (e.g., save token and redirect)
        console.log('Login successful:', response);
        alert('¡Inicio de sesión exitoso!');
        this.router.navigate(['/home']);
      },
      (error) => {
        // Handle login error
        console.error('Login failed:', error);
        alert('Error: Usuario o contraseña incorrectos');
      }
    );
  }
}
