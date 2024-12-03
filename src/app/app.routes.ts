import { Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { MenuFormComponent } from './menu/menu-form.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'menus', component: MenuComponent},
    {path: 'create-menu', component: MenuFormComponent},
    {path: 'update-menu/:id', component: MenuFormComponent}
];
