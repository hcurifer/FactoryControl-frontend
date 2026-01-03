import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Maquina } from '../../data-access/models/maquina.model';
import { MaquinaApi } from '../../data-access/api/maquina.api';

@Injectable({ providedIn: 'root' })
export class MaquinaService {

  constructor(private maquinaApi: MaquinaApi) {}

  /** Obtener listado de máquinas */
  getMaquinas(): Observable<Maquina[]> {
    return this.maquinaApi.getMaquinas();
  }
}
