import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import { Maquina } from '../models/maquina.model';
import { MaquinaCreate } from '../models/maquina-create.model';

@Injectable({ providedIn: 'root' })
export class MaquinaApi {

  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getMaquinas(): Observable<Maquina[]> {
    return this.http.get<Maquina[]>(
      `${this.baseUrl}/maquinas`
    );
  }
  getById(idMaquina: number): Observable<Maquina> {
    return this.http.get<Maquina>(
      `${this.baseUrl}/maquinas/${idMaquina}`
    );
  }
  getMaquinasProduccion(): Observable<Maquina[]> {
    return this.http.get<Maquina[]>(
      `${this.baseUrl}/maquinas/produccion`
    );
  }

  getMaquinasParadas(): Observable<Maquina[]> {
    return this.http.get<Maquina[]>(
      `${this.baseUrl}/maquinas/paradas`
    );
  }

  getMaquinasPendientePreventivo(): Observable<Maquina[]> {
    return this.http.get<Maquina[]>(
      `${this.baseUrl}/maquinas/pendiente-preventivo`
    );
  }

  getMaquinasConAlarma(): Observable<Maquina[]> {
    return this.http.get<Maquina[]>(
      `${this.baseUrl}/maquinas/con-alarma`
    );
  }

  getMaquinasInactivas(): Observable<Maquina[]> {
    return this.http.get<Maquina[]>(
      `${this.baseUrl}/maquinas/inactivas`
    );
  }

  create(data: MaquinaCreate): Observable<Maquina> {
    return this.http.post<Maquina>(
      `${this.baseUrl}/maquinas/`,
      data
    );
  }
}
