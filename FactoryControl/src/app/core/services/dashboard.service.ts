import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest, of } from 'rxjs';
import { switchMap, map, catchError, shareReplay } from 'rxjs/operators';

import { DashboardApi } from '../../data-access/api/dashboard.api';
import { AuthMeResponse } from '../../data-access/models/auth-me.model';
import { FichajeAbiertoResponse } from '../../data-access/models/fichajes.model';


export interface DashboardVM {
  me: AuthMeResponse;
  hayFichajeAbierto: boolean;
  rolLabel: string;
  rolChipColor: 'primary' | 'accent';
  disponibilidadLabel: string;
  disponibilidadClass: 'ok' | 'bad';
}

@Injectable({ providedIn: 'root' })
export class DashboardService {

  private refresh$ = new BehaviorSubject<void>(undefined);

  constructor(private dashboardApi: DashboardApi) {}

  /** DATOS BASE */

  getMe(): Observable<AuthMeResponse> {
    return this.refresh$.pipe(
      switchMap(() => this.dashboardApi.getMe()),
      shareReplay(1)
    );
  }

  getFichajeAbierto(idUsuario: number): Observable<FichajeAbiertoResponse | null> {
    return this.dashboardApi.getFichajeAbierto(idUsuario).pipe(
      catchError(() => of(null))
    );
  }

  /** VIEW MODEL DASHBOARD */

  getDashboardVM(): Observable<DashboardVM> {
    return this.getMe().pipe(
      switchMap((me) =>
        combineLatest([
          of(me),
          this.getFichajeAbierto(me.id_usuario)
        ])
      ),
      map(([me, fichajeAbierto]) => {
        const isMando = me.rol === 'mando';

        return {
          me,
          hayFichajeAbierto: !!fichajeAbierto,
          rolLabel: isMando ? 'Mando' : 'Técnico',
          rolChipColor: isMando ? 'primary' : 'accent',
          disponibilidadLabel: me.estado_disponible ? 'Disponible' : 'No disponible',
          disponibilidadClass: me.estado_disponible ? 'ok' : 'bad'
        };
      })
    );
  }

  /** ACCIONES */

  ficharEntrada(): Observable<void> {
    return this.getMe().pipe(
      switchMap((me) => {
        const now = new Date();

        return this.dashboardApi.ficharEntrada({
          id_usuario: me.id_usuario,
          comentario: 'Entrada',
          fecha: now.toISOString().slice(0, 10),
          hora_entrada: now.toISOString()
        }).pipe(
          switchMap(() =>
            this.dashboardApi.setDisponibilidad(me.id_usuario, true)
          ),
          map(() => this.refresh$.next())
        );
      })
    );
  }

  ficharSalida(
    salidaAntesDeTiempo: boolean,
    motivo?: string
  ): Observable<void> {
    return this.getMe().pipe(
      switchMap((me) => {
        const now = new Date();

        const comentario = salidaAntesDeTiempo
          ? `[SALIDA ANTES DE TIEMPO] ${motivo}`
          : 'Salida';

        return this.dashboardApi.ficharSalida(me.id_usuario, {
          hora_salida: now.toISOString(),
          comentario
        }).pipe(
          switchMap(() =>
            this.dashboardApi.setDisponibilidad(me.id_usuario, false)
          ),
          map(() => this.refresh$.next())
        );
      })
    );
  }
}
