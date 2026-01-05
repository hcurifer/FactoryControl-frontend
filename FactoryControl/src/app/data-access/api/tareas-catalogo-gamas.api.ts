import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TareaCatalogoGama } from '../models/tarea-catalogo-gama.model';

@Injectable({ providedIn: 'root' })
export class TareasCatalogoGamasApi {

  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  /** GET /tareas-catalogo-gamas/{tarea_id} */
  getById(idTarea: number): Observable<TareaCatalogoGama> {
    return this.http.get<TareaCatalogoGama>(
      `${this.baseUrl}/tareas-catalogo-gamas/${idTarea}`
    );
  }
  getByGama(idGama: number): Observable<TareaCatalogoGama[]> {
    return this.http.get<TareaCatalogoGama[]>(
      `${this.baseUrl}/tareas-catalogo-gamas/gama/${idGama}`
    );
  }

  create(data: Partial<TareaCatalogoGama>): Observable<TareaCatalogoGama> {
    return this.http.post<TareaCatalogoGama>(
      `${this.baseUrl}/tareas-catalogo-gamas/`,
      data
    );
  }
  update(idTarea: number, data: Partial<TareaCatalogoGama>): Observable<TareaCatalogoGama> {
    return this.http.patch<TareaCatalogoGama>(
      `${this.baseUrl}/tareas-catalogo-gamas/${idTarea}`,
      data
    );
  }

  delete(idTarea: number): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/tareas-catalogo-gamas/${idTarea}`
    );
  }
}
