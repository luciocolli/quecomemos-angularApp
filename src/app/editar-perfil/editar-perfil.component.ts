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

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.loadUsuario(); // Fetch user details on component initialization
  }

  // Load current user details
  loadUsuario(): void {
    this.usuarioService.getUsuario(localStorage.getItem('email')!).subscribe(
      (data) => {
        this.usuario = data;
      },
      (error) => {
        console.error('Error al cargar el usuario:', error);
      }
    );
  }

  // Handle file selection
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  // Handle form submission
  onSubmit(): void {
    this.loading = true;

    const formData = new FormData();
    formData.append('dni', this.usuario.dni);
    formData.append('nombres', this.usuario.nombres);
    formData.append('apellidos', this.usuario.apellidos);
    formData.append('mail', this.usuario.mail);
    formData.append('password', this.usuario.password);

    // Append the file only if a new file was selected
    if (this.selectedFile) {
      formData.append('imagen', this.selectedFile, this.selectedFile.name);
    }

    this.usuarioService.editarPerfil(formData).subscribe(
      (response) => {
        console.log('Usuario actualizado:', response);
        alert('Perfil actualizado exitosamente.');
        this.loading = false;
        this.loadUsuario(); // Refresh the user details
      },
      (error) => {
        console.error('Error al actualizar el usuario:', error);
        alert('Ocurrió un error al actualizar el perfil.');
        this.loading = false;
      }
    );
  }
}

