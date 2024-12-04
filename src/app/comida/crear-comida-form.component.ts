import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ComidaService } from '../services/comida.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-comida-form',
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './crear-comida-form.component.html',
  styleUrl: './crear-comida-form.component.css'
})
export class CrearComidaFormComponent {
  comidaForm: FormGroup;
  isUpdating: boolean = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private comidaService: ComidaService, private router: Router) {
    this.comidaForm = this.fb.group({
      nombre: ['', Validators.required],
      precio: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  submit() {
    const comidaData = this.comidaForm.value;
    this.comidaService.crearComida(comidaData).subscribe({
      next: () => {
        this.successMessage = 'Comida creada exitosamente.';
        this.errorMessage = null;
      },
      error: () => {
        this.errorMessage = 'Error al crear la comida: ';
        this.successMessage = null;
      }
    });
  }

  navigateToComidas() {
    this.router.navigate(['/comidas']);
  }

}

