import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';

import { AveriaUrgenteApi } from '../../data-access/api/averia-urgente.api';
import { AveriaUrgente, EstadoAveriaUrgente } from '../../data-access/models/averia-urgente.model';
import { AveriaUrgenteView } from '../../data-access/models/averia-urgente.view.model';

import { MaquinaService } from './maquina.service';
import { UsuariosService } from './usuarios.service';
@Injectable({ providedIn: 'root' })
export class AveriaUrgenteService {

  constructor(
    private api: AveriaUrgenteApi,
    private maquinaService: MaquinaService,
    private usuariosService: UsuariosService
  ) {}

  crearAveria(data: {
    descripcion: string;
    prioridad: string;
    id_maquina: number;
  }): Observable<AveriaUrgente> {
    return this.api.crearAveria(data);
  }

  /** Listado general */
  getAll(): Observable<AveriaUrgente[]> {
    return this.api.getAll();
  }

  /** Listado por estado */
  getByEstado(estado: EstadoAveriaUrgente): Observable<AveriaUrgente[]> {
    return this.api.getByEstado(estado);
  }

  /** Extender modelo 1:1 de backend */
  getAllEnriquecidas(): Observable<AveriaUrgenteView[]> {
    return this.api.getAll().pipe(
      switchMap(averias =>
        forkJoin(
          averias.map(averia => this.enriquecerAveria(averia))
        )
      )
    );
  }

  /** Completar avería */
  completarAveria(idAveria: number): Observable<AveriaUrgente> {
    return this.api.changeEstado(idAveria, 'completada');
  }

  /** Marcar como no realizada */
  marcarNoRealizada(idAveria: number, motivo: string): Observable<AveriaUrgente> {
    return this.api.changeEstado(idAveria, 'no_realizada', motivo);
  }

   /* MÉTODO PRIVADO DE ENRIQUECIMIENTO  */

  private enriquecerAveria(
    averia: AveriaUrgente
  ): Observable<AveriaUrgenteView> {

    const maquina$ = this.maquinaService.getById(averia.id_maquina);

    const tecnico$ = averia.id_usuario_asignado
      ? this.usuariosService.getById(averia.id_usuario_asignado)
      : of(null);

    const denunciante$ = averia.id_usuario_creador
      ? this.usuariosService.getById(averia.id_usuario_creador)
      : of(null);

    return forkJoin({
      maquina: maquina$,
      tecnico: tecnico$,
      denunciante: denunciante$
    }).pipe(
      map(({ maquina, tecnico, denunciante }) => ({
        ...averia,

        // Máquina
        maquina_nombre: maquina?.nombre,
        maquina_ubicacion: maquina?.ubicacion,

        // Técnico asignado
        tecnico_nombre: tecnico?.nombre,
        tecnico_apellidos: tecnico?.apellidos,

        // Denunciante
        denunciante_nombre: denunciante?.nombre,
        denunciante_apellidos: denunciante?.apellidos
      }))
    );
  }
}
