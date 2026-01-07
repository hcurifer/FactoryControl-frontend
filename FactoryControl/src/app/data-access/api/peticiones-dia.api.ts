import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { PeticionDia, PeticionDiaCreate } from '../models/peticion-dia.model';

@Injectable({ providedIn: 'root' })
export class PeticionesDiaApi {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  /** POST /peticiones-dia/ Crear una petición */
  create(data: PeticionDiaCreate): Observable<PeticionDia> {
    return this.http.post<PeticionDia>(`${this.baseUrl}/peticiones-dia/`, data);
  }
}
