import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private url = 'http://localhost:8080/menus';  // agregar 'seguro' a la ruta

  constructor(private http: HttpClient) { }

  getAllMenus(page: number = 0, size: number = 5): Observable<any> {
    const params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString());

    return this.http.get<any>(`${this.url}/showMenus`, { params });
  }

  getMenus(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/showAllMenus`);
  }

  createMenu(menuData: any): Observable<any> {
    return this.http.post<any>(`${this.url}/createMenu`, menuData);
  }

  updateMenu(id: number, menuData: any): Observable<any> {
    return this.http.put<any>(`${this.url}/updateMenu/${id}`, menuData);
  }

  getMenuById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/showMenu/${id}`);
  }

  getMenusDelDia(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/menusDelDia`);
  }

}
