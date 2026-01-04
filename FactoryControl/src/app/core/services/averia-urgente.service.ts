import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AveriaUrgenteApi } from '../../data-access/api/averia-urgente.api';
import { AveriaUrgente, EstadoAveriaUrgente } from '../../data-access/models/averia-urgente.model';

@Injectable({ providedIn: 'root' })
export class AveriaUrgenteService {

  constructor(private api: AveriaUrgenteApi) {}

  /** Listado general */
  getAll(): Observable<AveriaUrgente[]> {
    return this.api.getAll();
  }

  /** Listado por estado */
  getByEstado(estado: EstadoAveriaUrgente): Observable<AveriaUrgente[]> {
    return this.api.getByEstado(estado);
  }

  /** Completar avería */
  completarAveria(idAveria: number): Observable<AveriaUrgente> {
    return this.api.changeEstado(idAveria, 'completada');
  }

  /** Marcar como no realizada */
  marcarNoRealizada(idAveria: number, motivo: string): Observable<AveriaUrgente> {
    return this.api.changeEstado(idAveria, 'no_realizada', motivo);
  }
}
