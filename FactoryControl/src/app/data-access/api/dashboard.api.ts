import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import { AuthMeResponse } from '../models/auth-me.model';
import {
  FichajeAbiertoResponse,
  FichajeEntradaRequest,
  FichajeSalidaRequest
} from '../models/fichajes.model';

@Injectable({ providedIn: 'root' })
export class DashboardApi {

  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  /** USUARIO LOGADO */
  getMe(): Observable<AuthMeResponse> {
    return this.http.get<AuthMeResponse>(
      `${this.baseUrl}/auth/me`
    );
  }

  /** FICHAJES */

  getFichajeAbierto(idUsuario: number): Observable<FichajeAbiertoResponse> {
    return this.http.get<FichajeAbiertoResponse>(
      `${this.baseUrl}/fichajes/abierto/${idUsuario}`
    );
  }

  ficharEntrada(payload: FichajeEntradaRequest): Observable<void> {
    return this.http.post<void>(
      `${this.baseUrl}/fichajes/entrada`,
      payload
    );
  }

  ficharSalida(
    idUsuario: number,
    payload: FichajeSalidaRequest
  ): Observable<void> {
    return this.http.patch<void>(
      `${this.baseUrl}/fichajes/salida/${idUsuario}`,
      payload
    );
  }

  /** DISPONIBILIDAD USUARIO */

  setDisponibilidad(
    idUsuario: number,
    estado: boolean
  ): Observable<{ estado_disponible: boolean }> {
    return this.http.patch<{ estado_disponible: boolean }>(
      `${this.baseUrl}/usuarios/${idUsuario}/disponibilidad`,
      { estado_disponible: estado }
    );
  }
}
