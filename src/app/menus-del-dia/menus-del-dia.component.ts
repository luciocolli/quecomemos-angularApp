import { Component, OnInit} from '@angular/core';
import { MenuService } from '../services/menu.service';
import {Router} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menus-del-dia',
  imports: [CommonModule],
  templateUrl: './menus-del-dia.component.html',
  styleUrl: './menus-del-dia.component.css'
})
export class MenusDelDiaComponent implements OnInit {
  menusData: any; // Aquí almacenamos los datos completos del backend
  randomMenus: any[] = []; // Solo los menús aleatorios

  constructor(private menuService: MenuService, private router: Router) {}

  ngOnInit(): void {
    this.loadMenus();
  }

  loadMenus() {
    this.menuService.getMenus().subscribe({
      next: (data) => {
        console.log('Respuesta completa del backend:', data);
        this.menusData = data; // Guarda la respuesta completa
        this.randomMenus = this.getRandomMenus(4); // Selecciona 4 menús aleatorios
      },
      error: (err) => {
        console.error('Error al cargar los menús:', err);
        this.menusData = null;
      }
    });
  }

  getRandomMenus(count: number): any[] {
    if (!this.menusData || !Array.isArray(this.menusData)) {
      return [];
    }
  
    const shuffled = [...this.menusData].sort(() => 0.5 - Math.random()); // Mezcla aleatoriamente
    return shuffled.slice(0, count); // Selecciona los primeros `count` elementos
  }
}


