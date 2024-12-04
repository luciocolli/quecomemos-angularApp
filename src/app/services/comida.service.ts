import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  private apiUrl = 'http://127.0.0.1:8080/comidas/listarComidas';

  constructor(private http: HttpClient) {}

  // Método para obtener el listado de comidas
  listarComidas(): Observable<Comida[]> {
    return this.http.get<Comida[]>(this.apiUrl);
  }
}

