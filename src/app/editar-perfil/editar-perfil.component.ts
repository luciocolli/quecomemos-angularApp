import { Component } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./editar-perfil.component.css'],
})
export class EditarPerfilComponent {
  usuario: any = {}; // User information
  selectedFile: File | null = null; // To handle file upload
  loading: boolean = false; // Spinner indicator
  fotoBase64: any = null; // Store Base64 string
  message: string = ''; // Success message
  error: boolean = false; // Error indicator
  success: boolean = false; // Success indicator

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.loadUsuario(); // Fetch user details on component initialization
  }

  // Load current user details
  loadUsuario(): void {
    this.usuarioService.getUsuario({email: localStorage.getItem('email')}).subscribe({
      next: (response) => {
        this.usuario = response.data;
      },
      error: (error) => {
        console.error('Error al cargar el usuario:', error);
      },
    });
  }

  // Handle file selection
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

  // Handle form submission
  onSubmit(): void {
    if (!this.usuario.dni || !this.usuario.nombres || !this.usuario.apellidos || !this.usuario.mail || !this.usuario.password) {
      console.log(this.usuario);
      this.error = true;
      this.message = 'Todos los campos son obligatorios.';
      return;
    }
    this.loading = true;
    this.success = false;
    this.error = false;

    const payload = {
      id: this.usuario.id,
      dni: this.usuario.dni,
      nombres: this.usuario.nombres,
      apellidos: this.usuario.apellidos,
      email: this.usuario.mail,
      password: this.usuario.password,
      imagen: this.fotoBase64, // Send Base64 string
    };

    // Append the file only if a new file was selected

    this.usuarioService.editarPerfil(payload).subscribe({
      next: (response) => {
        console.log('Usuario actualizado:', response);
        this.loading = false;
        this.message = 'Se modificaron los datos exitosamente.';
        this.success = true;
        this.loadUsuario(); // Refresh the user details
      },
      error: (error) => {
        console.error('Error al actualizar el usuario:', error);
        this.success = false;
        this.message = 'Ocurrió un error al actualizar el perfil.';
        this.error = true;
        this.loading = false;
      }

    }
    );
  }
}

