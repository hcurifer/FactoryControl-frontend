import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import { Maquina } from '../models/maquina.model';

@Injectable({ providedIn: 'root' })
export class MaquinaApi {

  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getMaquinas(): Observable<Maquina[]> {
    return this.http.get<Maquina[]>(
      `${this.baseUrl}/maquinas`
    );
  }
}
