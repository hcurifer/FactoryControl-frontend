import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TareaPreventivo } from '../models/tarea-preventivo.model';

@Injectable({ providedIn: 'root' })
export class TareaPreventivoApi {

  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getByUsuario(idUsuario: number): Observable<TareaPreventivo[]> {
    return this.http.get<TareaPreventivo[]>(
      `${this.baseUrl}/tareas-preventivo/usuario/${idUsuario}`
    );
  }
  changeEstado(
    idTarea: number,
    estado: 'completada'
  ): Observable<any> {
    return this.http.patch(
      `${this.baseUrl}/tareas-preventivo/${idTarea}/estado`,
      { estado }
    );
  }
  generar(data: {
    id_gama: number;
    id_maquina: number;
    id_usuario: number;
    fecha_asignada: string;
  }): Observable<TareaPreventivo[]> {
    return this.http.post<TareaPreventivo[]>(
      `${this.baseUrl}/tareas-preventivo/generar`,
      data
    );
  }

  completar(idTarea: number): Observable<TareaPreventivo> {
    return this.http.patch<TareaPreventivo>(
      `${this.baseUrl}/tareas-preventivo/${idTarea}/estado`,
      { estado: 'completada' }
    );
  }
}
