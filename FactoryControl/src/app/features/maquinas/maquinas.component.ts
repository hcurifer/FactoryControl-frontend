import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Maquina } from '../../data-access/models/maquina.model';
import { MaquinaService } from '../../core/services/maquina.service';
import { MaquinaDetalleModalComponent } from './maquina-detalle-modal/maquina-detalle-modal.component';
import { MaquinaFiltro } from '../../data-access/models/maquina-filtro.model';
import { CrearMaquinaModalComponent } from './modals/crear-maquina-modal/crear-maquina-modal.component';

@Component({
  selector: 'app-maquinas',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTooltipModule
  ],
  templateUrl: './maquinas.component.html',
  styleUrl: './maquinas.component.scss'
})
export class MaquinasComponent implements OnInit {

/** Máquinas obtenidas desde la API */
  maquinas$!: Observable<Maquina[]>;

/** Filtro Selecionado */
  filtroActual: MaquinaFiltro = "todas";

  constructor(
    private maquinaService: MaquinaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    // Cargar todas las maquinas de forma inicial
    this.cargarMaquinas();
  }
  private cargarMaquinas(): void {
    this.maquinas$ = this.maquinaService.getMaquinasByFiltro(this.filtroActual);
  }

  /** Cambio de filtro desde el select */
  onFiltroChange(filtro: MaquinaFiltro): void {
    this.filtroActual = filtro;
    this.cargarMaquinas();
    this.maquinas$ = this.maquinaService.getMaquinasByFiltro(filtro);
  }

  openCrearMaquina(): void {
    const dialogRef = this.dialog.open(CrearMaquinaModalComponent, {
      width: '780px',
      maxWidth: '95vw',
      disableClose: true,
      panelClass: 'fc-dialog-mock',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(payload => {
      if (!payload) return;

      this.maquinaService.create(payload).subscribe({
        next: () => {
          this.snackBar.open(
            'Máquina creada correctamente',
            'Cerrar',
            { duration: 3000 }
          );
          this.cargarMaquinas();
        },
        error: () => {
          this.snackBar.open(
            'Error al crear la máquina',
            'Cerrar',
            { duration: 4000 }
          );
        }
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

    /** Abrir modal de detalle */
  abrirDetalle(maquina: Maquina): void {
    const dialogRef = this.dialog.open(MaquinaDetalleModalComponent, {
      width: '700px',
      data: maquina
    });

    dialogRef.afterClosed().subscribe(refrescar => {
      if (refrescar) {
        this.cargarMaquinas();
      }
    });
  }
}
