import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Maquina } from '../../../data-access/models/maquina.model';
import { AuthService } from '../../../core/services/auth.service';
import { MaquinaService } from '../../../core/services/maquina.service';
import { ConfirmDialogComponent } from '../modals/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-maquina-detalle-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatCardModule
  ],
  templateUrl: './maquina-detalle-modal.component.html',
  styleUrl: './maquina-detalle-modal.component.scss'
})
export class MaquinaDetalleModalComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  esMando = false;

  constructor(
    public dialogRef: MatDialogRef<MaquinaDetalleModalComponent>,
    @Inject(MAT_DIALOG_DATA) public maquina: Maquina,
    private dialog: MatDialog,
    private maquinaService: MaquinaService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Detectar rol
    this.authService.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.esMando = (user?.rol === 'mando' || user?.rol === 'Mando' || user?.rol === 'superior');
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  cerrar(): void {
    this.dialogRef.close();
  }

  bajaLogicaConDobleConfirmacion(): void {
    // Confirmación 1
    const c1 = this.dialog.open(ConfirmDialogComponent, {
      width: '520px',
      disableClose: true,
      data: {
        titulo: 'Dar de baja máquina',
        mensaje: '¿Seguro que quieres dar de baja esta máquina? No se eliminará de la base de datos.',
        confirmText: 'Sí, dar de baja',
        cancelText: 'Cancelar',
        icon: 'warning'
      }
    });

    c1.afterClosed().subscribe(ok1 => {
      if (!ok1) return;

      // Confirmación 2
      const c2 = this.dialog.open(ConfirmDialogComponent, {
        width: '520px',
        disableClose: true,
        data: {
          titulo: 'Confirmación final',
          mensaje: 'Última confirmación: ¿confirmas que deseas darla de baja?',
          confirmText: 'Confirmar baja',
          cancelText: 'Cancelar',
          icon: 'error'
        }
      });

      c2.afterClosed().subscribe(ok2 => {
        if (!ok2) return;

        this.maquinaService.deleteLogico(this.maquina.id_maquina).subscribe({
          next: () => {
            this.snackBar.open('Máquina dada de baja correctamente', 'Cerrar', { duration: 3000 });
            this.dialogRef.close(true); // <- refrescar listado
          },
          error: (err) => {
            const msg = err?.error?.detail || 'Error al dar de baja la máquina';
            this.snackBar.open(msg, 'Cerrar', { duration: 4000 });
          }
        });
      });
    });
  }

  deleteFisicoConDobleConfirmacion(): void {
    // Confirmación 1
    const c1 = this.dialog.open(ConfirmDialogComponent, {
      width: '520px',
      disableClose: true,
      data: {
        titulo: 'Eliminar máquina definitivamente',
        mensaje: '⚠️ Esta acción eliminará la máquina permanentemente de la base de datos.',
        confirmText: 'Sí, eliminar',
        cancelText: 'Cancelar',
        icon: 'warning'
      }
    });

    c1.afterClosed().subscribe(ok1 => {
      if (!ok1) return;

      // Confirmación 2
      const c2 = this.dialog.open(ConfirmDialogComponent, {
        width: '520px',
        disableClose: true,
        data: {
          titulo: 'Confirmación final',
          mensaje: 'Última confirmación: ¿seguro que deseas ELIMINARLA DEFINITIVAMENTE?',
          confirmText: 'Eliminar definitivamente',
          cancelText: 'Cancelar',
          icon: 'error'
        }
      });

      c2.afterClosed().subscribe(ok2 => {
        if (!ok2) return;

        this.maquinaService.deleteFisico(this.maquina.id_maquina).subscribe({
          next: () => {
            this.snackBar.open('Máquina eliminada definitivamente', 'Cerrar', { duration: 3000 });
            this.dialogRef.close(true); // <- refrescar listado
          },
          error: (err) => {
            const msg = err?.error?.detail || 'Error al eliminar definitivamente la máquina';
            this.snackBar.open(msg, 'Cerrar', { duration: 4000 });
          }
        });
      });
    });
  }


  getEstadoLabel(estado: Maquina['estado']): string {
    switch (estado) {
      case 'disponible': return 'Disponible';
      case 'parada': return 'Parada';
      case 'pendiente_preventivo': return 'Pendiente preventivo';
      default: return estado;
    }
  }

  getEstadoColor(estado: Maquina['estado']): string {
    switch (estado) {
      case 'disponible': return 'success';
      case 'parada': return 'warn';
      case 'pendiente_preventivo': return 'accent';
      default: return '';
    }
  }
}
