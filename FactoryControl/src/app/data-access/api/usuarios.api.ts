import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Usuario } from '../models/usuario.model';

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
}
