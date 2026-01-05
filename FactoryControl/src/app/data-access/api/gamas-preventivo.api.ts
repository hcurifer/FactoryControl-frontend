import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { GamaPreventivo } from '../models/gama-preventivo.model';

@Injectable({ providedIn: 'root' })
export class GamasPreventivoApi {

  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getAll(): Observable<GamaPreventivo[]> {
    return this.http.get<GamaPreventivo[]>(
      `${this.baseUrl}/gamas-preventivo/`
    );
  }

  getActivas(): Observable<GamaPreventivo[]> {
    return this.http.get<GamaPreventivo[]>(
      `${this.baseUrl}/gamas-preventivo/activas`
    );
  }

  create(data: Partial<GamaPreventivo>): Observable<GamaPreventivo> {
    return this.http.post<GamaPreventivo>(
      `${this.baseUrl}/gamas-preventivo/`,
      data
    );
  }

  update(idGama: number, data: Partial<GamaPreventivo>): Observable<GamaPreventivo> {
    return this.http.patch<GamaPreventivo>(
      `${this.baseUrl}/gamas-preventivo/${idGama}`,
      data
    );
  }

  changeEstado(idGama: number, activa: boolean): Observable<GamaPreventivo> {
    return this.http.patch<GamaPreventivo>(
      `${this.baseUrl}/gamas-preventivo/${idGama}/estado`,
      { activa }
    );
  }
}
