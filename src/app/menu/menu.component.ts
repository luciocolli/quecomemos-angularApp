import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import {Router} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  menus: any[] = [];
  currentPage: number = 0; // Página actual
  totalItems: number = 0; // Total de elementos (para la paginación)
  pageSize: number = 5; // Número de elementos por página

  constructor(private menuService: MenuService, private router: Router) {}

  ngOnInit(): void {
    this.loadMenus();
  }

  loadMenus(page: number = this.currentPage) {
    this.menuService.getAllMenus(page, this.pageSize).subscribe(data => {
      this.menus = data.menus;  // La lista de menús
      this.totalItems = data.totalItems;  // El total de elementos
      this.currentPage = page;  // Actualizamos la página actual
    });
  }

  // Funciones para ir a la siguiente y anterior página
  goToPage(page: number) {
    if (page < 0 || page >= this.totalPages()) return; // No ir fuera de los límites
    this.loadMenus(page);
  }

  totalPages() {
    return Math.ceil(this.totalItems / this.pageSize);  // Total de páginas disponibles
  }

  createMenu() {
    this.router.navigate(['/create-menu']);
  }

  updateMenu(id: number) {
    this.router.navigate([`/update-menu/${id}`]);
  }

}
