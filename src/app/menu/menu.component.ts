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

  constructor(private menuService: MenuService, private router: Router) {}

  ngOnInit(): void {
    this.loadMenus();
  }

  loadMenus() {
    this.menuService.getAllMenus().subscribe(data => {
      this.menus = data;
    });
  }

  createMenu() {
    this.router.navigate(['/create-menu']);
  }

  updateMenu(id: number) {
    this.router.navigate([`/update-menu/${id}`]);
  }

}
