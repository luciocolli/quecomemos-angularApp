import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuService } from '../services/menu.service';
import { ComidaService } from '../services/comida.service';

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.css']
})
export class MenuFormComponent implements OnInit {
  menuForm: FormGroup;
  comidas: any[] = [];
  menusDelDia: any[] = [];
  isUpdating: boolean = false;
  currentMenuId: number | null = null;

  constructor(private fb: FormBuilder, private menuService: MenuService, private route: ActivatedRoute, private router: Router) {
    this.menuForm = this.fb.group({
      nombre: ['', Validators.required],
      vegetariano: [false],
      aptoCeliacos: [false],
      comidaIds: [[]], // Para almacenar los IDs de las comidas seleccionadas
      menuDelDiaId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.comidaService.getComidas().subscribe(data => this.comidas = data);  // falta implementar el servicio getComidas
    this.menuDelDiaService.getMenusDelDia().subscribe(data => this.menusDelDia = data);  // debo crear un endpoint que me traiga los menus del dia
    
    // Detectar si estamos editando
    this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        if (id) {
          this.isUpdating = true;
          this.currentMenuId = +id;
          this.menuService.getMenuById(this.currentMenuId).subscribe(menu => {
            this.menuForm.patchValue(menu);
          });
        }
    });

  }

  submit() {
    const menuData = this.menuForm.value;

    if (this.isUpdating && this.currentMenuId) {
        // Actualizar menú
        this.menuService.updateMenu(this.currentMenuId, menuData).subscribe({
          next: () => {
            console.log('Menú actualizado exitosamente.');
            this.router.navigate(['/menus']); // Redirigir al listado
          },
          error: error => console.error('Error al actualizar el menú:', error)
        });
      } else {
        // Crear nuevo menú
        this.menuService.createMenu(menuData).subscribe({
          next: () => {
            console.log('Menú creado exitosamente.');
            this.router.navigate(['/menus']); // Redirigir al listado
          },
          error: error => console.error('Error al crear el menú:', error)
        });
      }
  }
  

  onComidaChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const comidaIds = this.menuForm.get('comidaIds')?.value || [];

    if (target.checked) {
      this.menuForm.get('comidaIds')?.setValue([...comidaIds, target.value]);
    } else {
      this.menuForm.get('comidaIds')?.setValue(comidaIds.filter((id: string) => id !== target.value));
    }
  }


}
