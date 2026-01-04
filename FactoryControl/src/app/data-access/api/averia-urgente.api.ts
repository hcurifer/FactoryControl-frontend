import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AveriaUrgente, EstadoAveriaUrgente } from '../models/averia-urgente.model';

@Injectable({ providedIn: 'root' })
export class AveriaUrgenteApi {

  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  /** GET /averias-urgentes/ Listar todas las averías */
  getAll(): Observable<AveriaUrgente[]> {
    return this.http.get<AveriaUrgente[]>(
      `${this.baseUrl}/averias-urgentes/`
    );
  }

  /** GET /averias-urgentes/estado/{estado} Listar por estado */
  getByEstado(
    estado: EstadoAveriaUrgente
  ): Observable<AveriaUrgente[]> {
    return this.http.get<AveriaUrgente[]>(
      `${this.baseUrl}/averias-urgentes/estado/${estado}`
    );
  }

  /** GET /averias-urgentes/maquina/{id_maquina} Listar por máquina */
  getByMaquina(
    idMaquina: number
  ): Observable<AveriaUrgente[]> {
    return this.http.get<AveriaUrgente[]>(
      `${this.baseUrl}/averias-urgentes/maquina/${idMaquina}`
    );
  }

  /** PATCH /averias-urgentes/{id}/estado Cambiar estado (completada / no_realizada) */
  changeEstado(
    idAveria: number,
    estado: EstadoAveriaUrgente,
    motivoNoRealizada?: string
  ): Observable<AveriaUrgente> {
    return this.http.patch<AveriaUrgente>(
      `${this.baseUrl}/averias-urgentes/${idAveria}/estado`,
      {
        estado,
        motivo_no_realizada: motivoNoRealizada
      }
    );
  }
}
