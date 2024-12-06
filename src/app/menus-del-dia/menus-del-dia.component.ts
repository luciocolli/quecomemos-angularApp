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
export class MenusDelDiaComponent {
  menus: any[] = [];
  randomMenus: any[] = [];

  constructor(private menuService: MenuService, private router: Router) {}

  ngOnInit(): void {
    this.loadMenus();
  }

  loadMenus() {
    this.menuService.getAllMenus().subscribe(data => {
      this.menus = data;
      this.randomMenus = this.getRandomMenus(4); // Selecciona 4 menús aleatorios
    });
  }

  getRandomMenus(count: number): any[] {
    const shuffled = [...this.menus].sort(() => 0.5 - Math.random()); // Mezcla aleatoriamente
    return shuffled.slice(0, count); // Selecciona los primeros `count` elementos
  }

}


