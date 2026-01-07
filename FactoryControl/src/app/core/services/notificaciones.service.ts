import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { NotificacionesApi } from '../../data-access/api/notificaciones.api';
import { Notificacion } from '../../data-access/models/notificaciones.model';

@Injectable({ providedIn: 'root' })
export class NotificacionesService {

  constructor(private api: NotificacionesApi) {}

  crearNotificacion(data: Notificacion): Observable<Notificacion> {
    return this.api.create(data);
  }
}
