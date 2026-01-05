import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { GamasPreventivoApi } from '../../data-access/api/gamas-preventivo.api';
import { GamaPreventivo } from '../../data-access/models/gama-preventivo.model';

@Injectable({ providedIn: 'root' })
export class GamasPreventivoService {

  constructor(private api: GamasPreventivoApi) {}

  getAll(): Observable<GamaPreventivo[]> {
    return this.api.getAll();
  }

  getActivas(): Observable<GamaPreventivo[]> {
    return this.api.getActivas();
  }

  create(data: {
    nombre: string;
    descripcion?: string;
    activa: boolean;
  }): Observable<GamaPreventivo> {
    return this.api.create(data);
  }

  update(
    idGama: number,
    data: {
      nombre?: string;
      descripcion?: string;
    }
  ): Observable<GamaPreventivo> {
    return this.api.update(idGama, data);
  }

  changeEstado(idGama: number, activa: boolean): Observable<GamaPreventivo> {
    return this.api.changeEstado(idGama, activa);
  }
}
