import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Usuario } from '../models/usuario.model';
import { UsuarioCreate } from '../models/usuario-create.model';
import { UsuarioEstadoUpdate } from '../models/usuario-estado-update.model';

@Injectable({ providedIn: 'root' })
export class UsuariosApi {

  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  /** Obtener usuario por ID */
  getById(idUsuario: number): Observable<Usuario> {
    return this.http.get<Usuario>(
      `${this.baseUrl}/usuarios/${idUsuario}`
    );
  }
  getAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseUrl}/usuarios/`);
  }
  getActivos(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseUrl}/usuarios/activos`);
  }

  getInactivos(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseUrl}/usuarios/inactivos`);
  }

  getDisponibles(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseUrl}/usuarios/disponibles`);
  }

  getNoDisponibles(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseUrl}/usuarios/no-disponibles`);
  }

  create(data: UsuarioCreate): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.baseUrl}/usuarios/`, data);
  }

  deleteLogico(idUsuario: number): Observable<Usuario> {
    return this.http.delete<Usuario>(`${this.baseUrl}/usuarios/${idUsuario}`);
  }

  updateDisponibilidad(idUsuario: number, data: UsuarioEstadoUpdate): Observable<Usuario> {
    return this.http.patch<Usuario>(`${this.baseUrl}/usuarios/${idUsuario}/disponibilidad`, data);
  }
}
