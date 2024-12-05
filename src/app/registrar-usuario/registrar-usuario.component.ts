import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../services/usuario.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  imports: [FormsModule, CommonModule], 
  styleUrls: ['./registrar-usuario.component.css'],
})
export class RegistrarUsuarioComponent {
  dni: string = '';
  nombres: string = '';
  apellidos: string = '';
  email: string = '';
  password: string = '';
  fotoBase64: string = ''; // Store Base64 string

  loading: boolean = false;
  error: string = '';
  success: string = '';

  constructor(private http: HttpClient,
              private usuarioService: UsuarioService,
              private router: Router
  ) {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.fotoBase64 = reader.result as string; // Convert image to Base64
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (!this.dni || !this.nombres || !this.apellidos || !this.email || !this.password || !this.fotoBase64) {
      this.error = 'Todos los campos son obligatorios.';
      return;
    }

    const payload = {
      dni: this.dni,
      nombres: this.nombres,
      apellidos: this.apellidos,
      email: this.email,
      password: this.password,
      imagen: this.fotoBase64, // Send Base64 string
    };

    this.loading = true;

    this.usuarioService.registrarUsuario(payload).subscribe({
      next: (response) => {
        this.success = 'Usuario registrado exitosamente.';
        this.loading = false;
        console.log(response);
        this.clearForm();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
        this.error = err.error || 'Error al registrar el usuario.';
        this.loading = false;
      },
    });
  }

  clearForm(): void {
    this.dni = '';
    this.nombres = '';
    this.apellidos = '';
    this.email = '';
    this.password = '';
    this.fotoBase64 = '';
  }
}
