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
}
