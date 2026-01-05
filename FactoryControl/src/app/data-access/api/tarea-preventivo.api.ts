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
}
