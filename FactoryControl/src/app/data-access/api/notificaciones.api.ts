import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Notificacion } from '../models/notificaciones.model';

@Injectable({ providedIn: 'root' })
export class NotificacionesApi {
  private readonly baseUrl = `${environment.apiBaseUrl}/notificaciones`;

  constructor(private http: HttpClient) {}

  create(data: Notificacion): Observable<Notificacion> {
    return this.http.post<Notificacion>(this.baseUrl, data);
  }
}
