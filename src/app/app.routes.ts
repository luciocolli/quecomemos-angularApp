import { Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { MenuFormComponent } from './menu/menu-form.component';
import { HomeComponent } from './home/home.component';
import { ComidaComponent } from './comida/comida.component';
import { CrearComidaFormComponent } from './comida/crear-comida-form.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'menus', component: MenuComponent},
    {path: 'create-menu', component: MenuFormComponent},
    {path: 'update-menu/:id', component: MenuFormComponent},
    {path: 'comidas', component: ComidaComponent},
    {path: 'create-comida', component: CrearComidaFormComponent},
    {path: 'login', component: LoginComponent}
];
