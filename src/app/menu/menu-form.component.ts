import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuService } from '../services/menu.service';
import { ComidaService } from '../services/comida.service';

@Component({
  selector: 'app-menu-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.css']
})
export class MenuFormComponent implements OnInit {
  menuForm: FormGroup;
  comidas: any[] = [];
  menusDelDia: any[] = [];
  isUpdating: boolean = false;
  currentMenuId: number | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;

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
    //this.comidaService.getComidas().subscribe(data => this.comidas = data);  // falta implementar el servicio getComidas
    this.menuService.getMenusDelDia().subscribe(data => { 
      this.menusDelDia = data;
      
      // Si hay IDs y el formulario aún no tiene un valor para menuDelDiaId, establece el primero como predeterminado
      if (this.menusDelDia.length > 0 && !this.isUpdating) {
        this.menuForm.patchValue({ menuDelDiaId: this.menusDelDia[0] });
      }
    });
    
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
            this.successMessage = 'Menu actualizado exitosamente.';
            this.errorMessage = null;
          },
          error: () => {
            this.errorMessage = 'Error al actualizar el menu: ';
            this.successMessage = null;
          }
        });
      } else {
        // Crear nuevo menú
        this.menuService.createMenu(menuData).subscribe({
          next: () => {
            this.successMessage = 'Menu creado exitosamente.';
            this.errorMessage = null;
          },
          error:() => {
            this.errorMessage = 'Error al crear el menu: ';
            this.successMessage = null;
          }
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

  navigateToMenus() {
    this.router.navigate(['/menus']);
  }


}
