import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';

import { TareaPreventivoApi } from '../../data-access/api/tarea-preventivo.api';
import { TareaPreventivo } from '../../data-access/models/tarea-preventivo.model';
import { TareaPreventivoView } from '../../data-access/models/tarea-preventivo.view.model';

import { MaquinaService } from './maquina.service';
import { TareasCatalogoGamasService } from './tareas-catalogo-gamas.service';

@Injectable({ providedIn: 'root' })
export class TareaPreventivoService {

  constructor(
    private api: TareaPreventivoApi,
    private maquinaService: MaquinaService,
    private tareasCatalogoService: TareasCatalogoGamasService
  ) {}

  getByUsuarioEnriquecidas(idUsuario: number): Observable<TareaPreventivoView[]> {
    return this.api.getByUsuario(idUsuario).pipe(
      switchMap(tareas =>
        forkJoin(tareas.map(t => this.enriquecerTarea(t)))
      )
    );
  }

  private enriquecerTarea(
    tarea: TareaPreventivo
  ): Observable<TareaPreventivoView> {

    const maquina$ = this.maquinaService.getById(tarea.id_maquina);
    const catalogo$ = this.tareasCatalogoService.getById(
      tarea.id_tarea_catalogo_gamas
    );

    return forkJoin({
      maquina: maquina$,
      catalogo: catalogo$
    }).pipe(
      map(({ maquina, catalogo }) => ({
        id_tarea_asignada: tarea.id_tarea_asignada,
        estado: tarea.estado,
        duracion_horas: tarea.duracion_horas,
        observaciones: tarea.observaciones,

        maquina_nombre: maquina?.nombre,
        maquina_ubicacion: maquina?.ubicacion,
        nombre_tarea: catalogo?.nombre_tarea
      }))
    );
  }
  completarTarea(idTarea: number): Observable<any> {
    return this.api.changeEstado(idTarea, 'completada');
  }
}
