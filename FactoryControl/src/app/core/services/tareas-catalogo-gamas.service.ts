import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TareasCatalogoGamasApi } from '../../data-access/api/tareas-catalogo-gamas.api';
import { TareaCatalogoGama } from '../../data-access/models/tarea-catalogo-gama.model';
import { TareaCatalogoGamaCreate } from '../../data-access/models/tarea-catalogo-gama-create.model';

@Injectable({ providedIn: 'root' })
export class TareasCatalogoGamasService {

  constructor(private api: TareasCatalogoGamasApi) {}

  getById(idTarea: number): Observable<TareaCatalogoGama> {
    return this.api.getById(idTarea);
  }
  getByGama(idGama: number): Observable<TareaCatalogoGama[]> {
    return this.api.getByGama(idGama);
  }

  create(data: TareaCatalogoGamaCreate): Observable<TareaCatalogoGama> {
    return this.api.create(data);
  }

  update(
    idTarea: number,
    data: {
      nombre_tarea?: string;
      descripcion?: string;
      duracion_horas?: number;
      orden?: number;
    }
  ): Observable<TareaCatalogoGama> {
    return this.api.update(idTarea, data);
  }

  delete(idTarea: number): Observable<void> {
    return this.api.delete(idTarea);
  }
}
