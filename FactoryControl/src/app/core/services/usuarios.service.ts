import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UsuariosApi } from '../../data-access/api/usuarios.api';
import { Usuario } from '../../data-access/models/usuario.model';
import { UsuarioCreate } from '../../data-access/models/usuario-create.model';
import { UsuarioEstadoUpdate } from '../../data-access/models/usuario-estado-update.model';

@Injectable({ providedIn: 'root' })
export class UsuariosService {

  constructor(private api: UsuariosApi) {}

  /** Obtener un usuario por ID */
  getById(idUsuario: number): Observable<Usuario> {
    return this.api.getById(idUsuario);
  }
  /** Obtener todos los usuarios */
  getAll(): Observable<Usuario[]> {
    return this.api.getAll();
  }
  getActivos(): Observable<Usuario[]> {
    return this.api.getActivos();
  }

  getInactivos(): Observable<Usuario[]> {
    return this.api.getInactivos();
  }

  getDisponibles(): Observable<Usuario[]> {
    return this.api.getDisponibles();
  }

  getNoDisponibles(): Observable<Usuario[]> {
    return this.api.getNoDisponibles();
  }

  create(data: UsuarioCreate): Observable<Usuario> {
    return this.api.create(data);
  }

  deleteLogico(idUsuario: number): Observable<Usuario> {
    return this.api.deleteLogico(idUsuario);
  }

  updateDisponibilidad(idUsuario: number, data: UsuarioEstadoUpdate): Observable<Usuario> {
    return this.api.updateDisponibilidad(idUsuario, data);
  }
}
