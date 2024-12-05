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
  currentPage: number = 0; // Página actual
  totalItems: number = 0; // Total de elementos (para la paginación)
  pageSize: number = 5; // Número de elementos por página

  constructor(private comidaService: ComidaService, private router: Router) {}

  ngOnInit(): void {
    this.loadComidas();
  }

  loadComidas(page: number = this.currentPage) {
    this.comidaService.listarComidas(page, this.pageSize).subscribe(data => {
      this.comidas = data.comidas;  // La lista de comidas
      this.totalItems = data.totalItems;  // El total de elementos
      this.currentPage = page;  // Actualizamos la página actual
    });
  }

  // Funciones para ir a la siguiente y anterior página
  goToPage(page: number) {
    if (page < 0 || page >= this.totalPages()) return; // No ir fuera de los límites
    this.loadComidas(page);
  }

  totalPages() {
    return Math.ceil(this.totalItems / this.pageSize);  // Total de páginas disponibles
  }

  createComida() {
    this.router.navigate(['/create-comida']);
  }

  updateComida(id: number) {
    this.router.navigate([`/update-comida/${id}`]);
  }

}

