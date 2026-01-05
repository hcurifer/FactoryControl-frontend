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

  generar(data: {
    id_gama: number;
    id_maquina: number;
    id_usuario: number;
    fecha_asignada: string;
  }): Observable<TareaPreventivo[]> {
    return this.api.generar(data);
  }

  completar(idTarea: number): Observable<TareaPreventivo> {
    return this.api.completar(idTarea);
  }

  private enriquecerTarea(
    tarea: TareaPreventivo
  ): Observable<TareaPreventivoView> {

    const maquina$ = this.maquinaService.getById(tarea.id_maquina);
    const catalogo$ = this.tareasCatalogoService.getByGama(tarea.id_gama);

    return forkJoin({
      maquina: maquina$,
      catalogo: catalogo$
    }).pipe(
      map(({ maquina, catalogo }) => {
        const tareaCatalogo = catalogo.find(
          t => t.id_tarea_catalogo_gamas === tarea.id_tarea_catalogo_gamas
        );

        return {
          ...tarea,
          maquina_nombre: maquina?.nombre,
          maquina_ubicacion: maquina?.ubicacion,
          nombre_tarea: tareaCatalogo?.nombre_tarea,
          descripcion_tarea: tareaCatalogo?.descripcion
        };
      })
    );
  }

  completarTarea(idTarea: number): Observable<any> {
    return this.api.changeEstado(idTarea, 'completada');
  }
}
