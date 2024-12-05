import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ComidaService } from '../services/comida.service';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crear-comida-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear-comida-form.component.html',
  styleUrl: './crear-comida-form.component.css',
})
export class CrearComidaFormComponent {
  comidaForm: FormGroup;
  isUpdating: boolean = false;
  currentComidaId: number | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  originalComida: any = {}; // Guardará los valores originales para comparar

  constructor(
    private fb: FormBuilder,
    private comidaService: ComidaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.comidaForm = this.fb.group({
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Detectar si estamos editando
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isUpdating = true;
        this.currentComidaId = +id;
        this.comidaService.getComidaById(this.currentComidaId).subscribe((comida) => {
          this.comidaForm.patchValue(comida);
          this.originalComida = { ...comida }; // Guarda los valores originales
        });
      }
    });
  }

  submit() {
    const updatedFields: any = {};

    // Compara los valores actuales con los originales para detectar cambios
    Object.keys(this.comidaForm.controls).forEach((key) => {
      const originalValue = this.originalComida[key];
      const currentValue = this.comidaForm.get(key)?.value;

      if ((currentValue !== "") && (currentValue !== originalValue)) {
        updatedFields[key] = currentValue; // Solo incluir los campos modificados
      }
    });

    if (this.isUpdating && this.currentComidaId) {
      // Actualizar comida con solo los campos editados
      this.comidaService.updateComida(this.currentComidaId, updatedFields).subscribe({
        next: (response) => {
          this.successMessage = response?.message || 'Comida actualizada exitosamente.';
          this.errorMessage = null;
          this.clearMessages();
        },
        error: (error) => {
          this.errorMessage = error?.error?.message || 'Error al actualizar la comida.';
          this.successMessage = null;
          this.clearMessages();
        },
      });
    } else {
      // Crear comida normalmente
      this.comidaService.crearComida(updatedFields).subscribe({
        next: (response) => {
          this.successMessage = response?.message || 'Comida creada exitosamente.';
          this.errorMessage = null;
          this.clearMessages();
        },
        error: (error) => {
          this.errorMessage = error?.error?.message || 'Error al crear la comida.';
          this.successMessage = null;
          this.clearMessages();
        },
      });
    }
  }

  // Función para limpiar los mensajes después de un tiempo
  clearMessages() {
    setTimeout(() => {
      this.successMessage = null;
      this.errorMessage = null;
      this.navigateToComidas();
    }, 3000); // Elimina el mensaje después de 3 segundos
  }

  navigateToComidas() {
    this.router.navigate(['/comidas']);
  }
}
