import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { DashboardService } from '../../core/services/dashboard.service';
import { ModalSalidaFichajeComponent } from './modal-salida-fichaje/modal-salida-fichaje.component';
import { DashboardVM } from '../../core/services/dashboard.service';
import { GestionarGamasModalComponent } from './modals/gestionar-gamas-modal/gestionar-gamas-modal.component';




@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  /** ViewModel del dashboard */
  vm$!: Observable<DashboardVM>;

  constructor(
    private dashboardService: DashboardService,
    private dialog: MatDialog
  ) {
    this.vm$ = this.dashboardService.getDashboardVM();
  }

  /** ACCIONES DE FICHAJE */

  ficharEntrada(): void {
    this.dashboardService.ficharEntrada().subscribe({
      error: (err) => console.error('Error al fichar entrada', err)
    });
  }

  ficharSalida(): void {
    const dialogRef = this.dialog.open(ModalSalidaFichajeComponent, {
      width: '420px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      this.dashboardService
        .ficharSalida(result.salidaAntesDeTiempo, result.motivo)
        .subscribe({
          error: (err) => console.error('Error al fichar salida', err)
        });
    });
  }
  openGestionarGamas(): void {
  this.dialog.open(GestionarGamasModalComponent, {
    width: '900px',
    disableClose: true
  });
}
}
