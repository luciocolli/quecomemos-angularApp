import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuService } from '../services/menu.service';
import { ComidaService } from '../services/comida.service';

@Component({
  selector: 'app-menu-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.css']
})
export class MenuFormComponent implements OnInit {
  menuForm: FormGroup;
  comidas: any[] = [];
  filteredComidas: any[] = [];  // comidas filtradas por el buscador
  menusDelDia: any[] = [];
  isUpdating: boolean = false;
  currentMenuId: number | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  originalMenu: any = {};
  searchQuery: string = '';

  constructor(private fb: FormBuilder, private menuService: MenuService, private comidaService: ComidaService, private route: ActivatedRoute, private router: Router) {
    this.menuForm = this.fb.group({
      nombre: ['', Validators.required],
      vegetariano: [false],
      aptoCeliacos: [false],
      comidaIds: [[]], // Para almacenar los IDs de las comidas seleccionadas
      menuDelDiaId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.comidaService.listarComidas().subscribe((data) =>{
        this.comidas = data;
        this.filteredComidas = data;  // inicialmente, mostrar todas las comidas
      }); 
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
            const comidaIds = menu.comidas.map((comida: any) => comida.id);

            this.menuForm.patchValue({
              nombre: menu.nombre,
              vegetariano: menu.vegetariano,  
              aptoCeliacos: menu.aptoCeliacos,
              comidaIds: comidaIds,
              menuDelDiaId: menu.menuDelDia.id
            });
            this.originalMenu = {...menu};  // guardo valores originales
          });
        }
    });

  }

  filterComidas(): void {
    this.filteredComidas = this.comidas.filter((comida) =>
      comida.nombre.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // para no perder las comidas seleccionadas al filtrar
  getVisibleComidas(): any[] {
    const selectedIds = this.menuForm.get('comidaIds')?.value || [];
    const selectedComidas = this.comidas.filter(comida => selectedIds.includes(comida.id));
    const uniqueComidas = [...new Map([...selectedComidas, ...this.filteredComidas].map(item => [item.id, item])).values()];
    return uniqueComidas;
  }
  

  submit() {
    const menuData = this.menuForm.value;

    if (this.isUpdating && this.currentMenuId) {
        // Comparo los valores originales con los actuales
        if (menuData.nombre === this.originalMenu.nombre) {
          delete menuData.nombre; // Eliminar el campo si no cambió
        }

        // Actualizar menú
        this.menuService.updateMenu(this.currentMenuId, menuData).subscribe({
          next: () => {
            this.successMessage = 'Menu actualizado exitosamente.';
            this.errorMessage = null;
          },
          error: () => {
            this.errorMessage = 'Error al actualizar el menu.';
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
            this.errorMessage = 'Error al crear el menu.';
            this.successMessage = null;
          }
        });
      }
  }
  

  onComidaChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const comidaIds = this.menuForm.get('comidaIds')?.value || [];

    const updatedComidaIds = target.checked
    ? [...comidaIds, +target.value] // Agrega el ID de la comida
    : comidaIds.filter((id: number) => id !== +target.value); // Elimina el ID desmarcado

    this.menuForm.get('comidaIds')?.setValue(updatedComidaIds);
  }

  navigateToMenus() {
    this.router.navigate(['/menus']);
  }


}
