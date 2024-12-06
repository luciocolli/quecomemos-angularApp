import { Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { MenuFormComponent } from './menu/menu-form.component';
import { HomeComponent } from './home/home.component';
import { ComidaComponent } from './comida/comida.component';
import { CrearComidaFormComponent } from './comida/crear-comida-form.component';
import { LoginComponent } from './login/login.component';
import { RegistrarUsuarioComponent } from './registrar-usuario/registrar-usuario.component';
import { AuthGuard } from './auth.guard';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';

export const routes: Routes = [
    {
        path: '', 
        redirectTo: '/home', 
        pathMatch: 'full',
    },
    {
        path: 'home', 
        component: HomeComponent,
    },
    {
        path: 'menus', 
        component: MenuComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'create-menu', 
        component: MenuFormComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'update-menu/:id', 
        component: MenuFormComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'comidas', 
        component: ComidaComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'create-comida', 
        component: CrearComidaFormComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'login', 
        component: LoginComponent
    },
    {
        path: 'registrarUsuario', 
        component: RegistrarUsuarioComponent
    },
    {
        path: 'editarPerfil',
        component: EditarPerfilComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'update-comida/:id', 
        component: CrearComidaFormComponent,
        canActivate: [AuthGuard],
    }
];
