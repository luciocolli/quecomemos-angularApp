import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ComidaService } from '../services/comida.service';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crear-comida-form',
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './crear-comida-form.component.html',
  styleUrl: './crear-comida-form.component.css'
})
export class CrearComidaFormComponent {
  comidaForm: FormGroup;
  isUpdating: boolean = false;
  currentComidaId: number | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private comidaService: ComidaService, private router: Router, private route: ActivatedRoute) {
    this.comidaForm = this.fb.group({
      nombre: ['', Validators.required],
      precio: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Detectar si estamos editando
    this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        if (id) {
          this.isUpdating = true;
          this.currentComidaId = +id;
          this.comidaService.getComidaById(this.currentComidaId).subscribe(comida => {
            this.comidaForm.patchValue(comida);
          });
        }
    });

  }

  submit() {
    const comidaData = this.comidaForm.value;
  
    if (this.isUpdating && this.currentComidaId) {
      // Actualizar comida
      this.comidaService.updateComida(this.currentComidaId, comidaData).subscribe({
        next: (response) => { 
          this.successMessage = 'Comida actualizada exitosamente.'; // Mensaje para éxito
          this.errorMessage = null;
        },
        error: (error) => {
          if (error.status === 500) {
            this.errorMessage = 'Error interno del servidor al actualizar la comida.';
          } else if (error.status === 404) {
            this.errorMessage = 'No se encontró la comida para actualizar.';
          } else {
            this.errorMessage = 'Error desconocido al actualizar la comida.';
          }
          this.successMessage = null;
        }
      });
    } else {
      // Crear comida
      this.comidaService.crearComida(comidaData).subscribe({
        next: (response) => { 
          this.successMessage = 'Comida creada exitosamente.'; // Mensaje para éxito
          this.errorMessage = null;
        },
        error: (error) => {
          if (error.status === 500) {
            this.errorMessage = 'Error interno del servidor al crear la comida.';
          } else if (error.status === 400) {
            this.errorMessage = 'Datos inválidos para crear la comida.';
          } else {
            this.errorMessage = 'Error desconocido al crear la comida.';
          }
          this.successMessage = null;
        }
      });
    }
  }
  
  

  navigateToComidas() {
    this.router.navigate(['/comidas']);
  }

}

