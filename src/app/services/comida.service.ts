import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define la estructura del modelo Comida (opcional, pero recomendado)
export interface Comida {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
}

@Injectable({
  providedIn: 'root', // Este servicio estará disponible en toda la aplicación.
})
export class ComidaService {
  private apiUrl = 'http://127.0.0.1:8080/comidas';

  constructor(private http: HttpClient) {}

  /// Método para listar comidas con paginación
  listarComidas(page: number = 0, size: number = 5): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<any>(`${this.apiUrl}/seguro/listarComidas`, { params });
  }

  // para formulario de menus
  getComidas(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/seguro/obtenerComidas`);
  }

  crearComida(comidaData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/seguro/crearComida`, comidaData);
  }

  updateComida(id: number, comidaData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/seguro/editarComida/${id}`, comidaData);
  }

  getComidaById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/seguro/verComida/${id}`);
  }
  
}

