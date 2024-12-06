import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Response {
  token: string;
  ok: boolean;
  message: string;
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  apiUrl = 'http://localhost:8080/usuarios';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<Response> {
    const body = { email, password };
    return this.http.post<Response>(`${this.apiUrl}/login`, body);
  }

  editarPerfil(usuario: any): Observable<Response> {
    return this.http.post<Response>(`${this.apiUrl}/seguro/editarUsuario`, usuario);
  }

  registrarUsuario(usuario: any): Observable<Response> {
    return this.http.post<Response>(`${this.apiUrl}/registrarCliente`, usuario);
  }

  getUsuario(email: any): Observable<Response> { 
    return this.http.post<Response>(`${this.apiUrl}/seguro/getUsuario`, email);
  }

}
