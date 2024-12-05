import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { ComidaService } from '../services/comida.service';

@Component({
  selector: 'app-comida',
  imports: [CommonModule],
  templateUrl: './comida.component.html',
  styleUrl: './comida.component.css'
})
export class ComidaComponent {
  comidas: any[] = [];

  constructor(private comidaService: ComidaService, private router: Router) {}

  ngOnInit(): void {
    this.loadComidas();
  }

  loadComidas() {
    this.comidaService.listarComidas().subscribe(data => {
      this.comidas = data;
    });
  }

  createComida() {
    this.router.navigate(['/create-comida']);
  }

  updateComida(id: number) {
    this.router.navigate([`/update-comida/${id}`]);
  }

}

