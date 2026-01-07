import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { GamaPreventivo } from '../../../../data-access/models/gama-preventivo.model';
import { TareaCatalogoGama } from '../../../../data-access/models/tarea-catalogo-gama.model';
import { TareasCatalogoGamasService } from '../../../../core/services/tareas-catalogo-gamas.service';
import { CrearTareaCatalogoModalComponent } from '../crear-tarea-catalogo-modal/crear-tarea-catalogo-modal.component';

@Component({
  selector: 'app-ver-tareas-gama-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './ver-tareas-gama-modal.component.html',
  styleUrl: './ver-tareas-gama-modal.component.scss'
})
export class VerTareasGamaModalComponent implements OnInit {
  tareasCatalogo: TareaCatalogoGama[] = [];
  cargandoTareas = false;

  constructor(
    private dialogRef: MatDialogRef<VerTareasGamaModalComponent>,
    private dialog: MatDialog,
    private tareasCatalogoService: TareasCatalogoGamasService,
    @Inject(MAT_DIALOG_DATA) public data: { gama: GamaPreventivo }
  ) {}

  ngOnInit(): void {
    this.cargarTareasCatalogo();
  }

  cargarTareasCatalogo(): void {
    this.cargandoTareas = true;
    this.tareasCatalogoService.getByGama(this.data.gama.id_gama).subscribe({
      next: (tareas) => {
        this.tareasCatalogo = tareas ?? [];
        this.cargandoTareas = false;
      },
      error: () => {
        this.tareasCatalogo = [];
        this.cargandoTareas = false;
      }
    });
  }

  abrirCrearTareaCatalogo(): void {
    const siguienteOrden =
      this.tareasCatalogo.length > 0
        ? Math.max(...this.tareasCatalogo.map(t => t.orden)) + 1
        : 1;

    this.dialog.open(CrearTareaCatalogoModalComponent, {
      width: '780px',
      maxWidth: '95vw',
      panelClass: 'fc-dialog-mock',
      data: {
        idGama: this.data.gama.id_gama,
        orden: siguienteOrden
      }
    }).afterClosed().subscribe((creada) => {
      if (creada) {
        this.cargarTareasCatalogo();
      }
    });
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}
