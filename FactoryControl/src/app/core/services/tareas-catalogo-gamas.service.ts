import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TareasCatalogoGamasApi } from '../../data-access/api/tareas-catalogo-gamas.api';
import { TareaCatalogoGama } from '../../data-access/models/tarea-catalogo-gama.model';

@Injectable({ providedIn: 'root' })
export class TareasCatalogoGamasService {

  constructor(private api: TareasCatalogoGamasApi) {}

  getById(idTarea: number): Observable<TareaCatalogoGama> {
    return this.api.getById(idTarea);
  }
}
