import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UsuariosApi } from '../../data-access/api/usuarios.api';
import { Usuario } from '../../data-access/models/usuario.model';

@Injectable({ providedIn: 'root' })
export class UsuariosService {

  constructor(private api: UsuariosApi) {}

  getById(idUsuario: number): Observable<Usuario> {
    return this.api.getById(idUsuario);
  }
}
