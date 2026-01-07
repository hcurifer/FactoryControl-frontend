import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Maquina } from '../../data-access/models/maquina.model';
import { MaquinaApi } from '../../data-access/api/maquina.api';
import { MaquinaFiltro } from '../../data-access/models/maquina-filtro.model';
import { MaquinaCreate } from '../../data-access/models/maquina-create.model';

@Injectable({ providedIn: 'root' })
export class MaquinaService {

  constructor(private maquinaApi: MaquinaApi) {}

  /** Obtener listado de máquinas */
  getMaquinas(): Observable<Maquina[]> {
    return this.maquinaApi.getMaquinas();
  }

  /** Obtener máquina por ID */
  getById(idMaquina: number): Observable<Maquina> {
    return this.maquinaApi.getById(idMaquina);
  }

   /** Crear una máquina */
  create(data: MaquinaCreate): Observable<Maquina> {
    return this.maquinaApi.create(data);
  }

   /** Listado general de máquinas */
  getAll(): Observable<Maquina[]> {
    return this.maquinaApi.getMaquinas();
  }

  getProduccion(): Observable<Maquina[]> {
    return this.maquinaApi.getMaquinasProduccion();
  }

  getParadas(): Observable<Maquina[]> {
    return this.maquinaApi.getMaquinasParadas();
  }

  getConAlarma(): Observable<Maquina[]> {
    return this.maquinaApi.getMaquinasConAlarma();
  }

  /** Selector de casos para filtros de maquinas */
  getMaquinasByFiltro(filtro: MaquinaFiltro): Observable<Maquina[]> {
    switch (filtro) {
      case 'produccion':
        return this.maquinaApi.getMaquinasProduccion();

      case 'paradas':
        return this.maquinaApi.getMaquinasParadas();

      case 'pendiente_preventivo':
        return this.maquinaApi.getMaquinasPendientePreventivo();

      case 'con_alarma':
        return this.maquinaApi.getMaquinasConAlarma();

      case 'inactivas':
        return this.maquinaApi.getMaquinasInactivas();

      case 'todas':
      default:
        return this.maquinaApi.getMaquinas();
    }
  }
}
