import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private url = 'http://localhost:8080/menus';

  constructor(private http: HttpClient) { }

  getAllMenus(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/showMenus`);
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

}
