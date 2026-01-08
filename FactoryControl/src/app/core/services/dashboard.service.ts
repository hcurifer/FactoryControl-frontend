import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest, of } from 'rxjs';
import { switchMap, map, catchError, shareReplay, tap } from 'rxjs/operators';

import { DashboardApi } from '../../data-access/api/dashboard.api';
import { AuthMeResponse } from '../../data-access/models/auth-me.model';
import { FichajeAbiertoResponse } from '../../data-access/models/fichajes.model';

/** ViewModel del Dashboard (datos ya preparados para la vista) */
export interface DashboardVM {
  me: AuthMeResponse;
  fichajeAbierto: FichajeAbiertoResponse | null;
  hayFichajeAbierto: boolean;

  rolLabel: string;
  rolClass: 'mando' | 'tecnico';
  cuentaLabel: string;
  cuentaClass: 'active' | 'inactive';
  disponibilidadLabel: string;
  disponibilidadClass: 'ok' | 'bad';
}

@Injectable({ providedIn: 'root' })
export class DashboardService {

  /** Trigger para refrescar el dashboard tras acciones */
  private refresh$ = new BehaviorSubject<void>(undefined);

  constructor(private dashboardApi: DashboardApi) {}

  /** Devuelve la hora actual en formato HH:mm:ss */
  private getHoraActual(): string {
    const now = new Date();
    return now.toTimeString().split(' ')[0]; // HH:mm:ss
  }

  /** Devuelve la fecha actual en formato YYYY-MM-DD */
  private getFechaActual(): string {
    return new Date().toISOString().slice(0, 10);
  }


  /** DATOS BASE */

  /** Usuario autenticado */
  getMe(): Observable<AuthMeResponse> {
    return this.refresh$.pipe(
      //switchMap(() => this.dashboardApi.getMe()),shareReplay(1)
      switchMap(() => this.dashboardApi.getMe())
    );
  }

  /** Fichaje abierto (si no existe → null) */
  getFichajeAbierto(idUsuario: number): Observable<FichajeAbiertoResponse | null> {
    return this.dashboardApi.getFichajeAbierto(idUsuario).pipe(
      catchError(() => of(null)) //404 = no hay fichaje abierto (estado válido)
    );
  }

  /** VIEW MODEL DASHBOARD */

  /** Datos listos para pintar el dashboard */
  getDashboardVM(): Observable<DashboardVM> {
    //return this.getMe().pipe(switchMap((me) =>combineLatest([of(me),this.getFichajeAbierto(me.id_usuario)
    return this.refresh$.pipe(
      switchMap(() => this.dashboardApi.getMe()),
      switchMap((me) =>
        combineLatest([
          of(me),
          this.getFichajeAbierto(me.id_usuario)
        ])
      ),
      map(([me, fichajeAbierto]) => {
        const isMando = me.rol === 'mando';
        const disponible = !!fichajeAbierto && me.estado_disponible;
        const cuentaActiva = me.fecha_baja == null;

        return {
          me,
          fichajeAbierto,
          hayFichajeAbierto: !!fichajeAbierto,

          rolLabel: isMando ? 'Mando' : 'Técnico',
          rolClass: isMando ? 'mando' : 'tecnico',

          cuentaLabel: cuentaActiva ? 'Cuenta activa' : 'Cuenta de baja',
          cuentaClass: cuentaActiva ? 'active' : 'inactive',

          disponibilidadLabel: disponible ? 'Disponible' : 'No disponible',
          disponibilidadClass: disponible ? 'ok' : 'bad'
        };
      })
    );
  }

  /** ACCIONES */

  /** Fichar entrada */
  ficharEntrada(): Observable<void> {
    return this.dashboardApi.getMe().pipe(
      switchMap((me) =>
        this.dashboardApi.ficharEntrada({
          id_usuario: me.id_usuario,
          comentario: 'Entrada',
          fecha: this.getFechaActual(),
          hora_entrada: this.getHoraActual() // FORMATO CORRECTO
        }).pipe(
          switchMap(() =>
            this.dashboardApi.setDisponibilidad(me.id_usuario, true)
          )
        )
      ),
      tap(() => this.refresh$.next()), // refresca el dashboard
      map(() => void 0)
    );
  }

  /** Fichar salida */
  ficharSalida(
    salidaAntesDeTiempo: boolean,
    motivo?: string
  ): Observable<void> {
    return this.dashboardApi.getMe().pipe(
      switchMap((me) => {
        const comentario = salidaAntesDeTiempo
          ? `[SALIDA ANTES DE TIEMPO] ${motivo}`
          : 'Salida';

        return this.dashboardApi.ficharSalida(me.id_usuario, {
          hora_salida: this.getHoraActual(), // entrada
          comentario
        }).pipe(
          switchMap(() =>
            this.dashboardApi.setDisponibilidad(me.id_usuario, false)
          )
        );
      }),
      tap(() => this.refresh$.next()), // refresca el dashboard
      map(() => void 0)
    );
  }
}
