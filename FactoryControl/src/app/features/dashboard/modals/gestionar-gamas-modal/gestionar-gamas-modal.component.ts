import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { GamasPreventivoService } from '../../../../core/services/gamas-preventivo.service';
import { GamaPreventivo } from '../../../../data-access/models/gama-preventivo.model';
import { CrearGamaModalComponent } from '../crear-gama-modal/crear-gama-modal.component';
import { TareasCatalogoGamasService } from '../../../../core/services/tareas-catalogo-gamas.service';
import { TareaCatalogoGama } from '../../../../data-access/models/tarea-catalogo-gama.model';
import { CrearTareaCatalogoModalComponent } from '../crear-tarea-catalogo-modal/crear-tarea-catalogo-modal.component';

@Component({
  selector: 'app-gestionar-gamas-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './gestionar-gamas-modal.component.html',
  styleUrl: './gestionar-gamas-modal.component.scss'
})
export class GestionarGamasModalComponent implements OnInit {

  gamas: GamaPreventivo[] = [];
  cargando = false;
  gamaSeleccionada: GamaPreventivo | null = null;
  tareasCatalogo: TareaCatalogoGama[] = [];
  cargandoTareas = false;

  constructor(
    private dialogRef: MatDialogRef<GestionarGamasModalComponent>,
    private gamasService: GamasPreventivoService,
    private dialog: MatDialog,
    private tareasCatalogoService: TareasCatalogoGamasService
  ) {}

  ngOnInit(): void {
    this.cargarGamas();
  }

  cargarGamas(): void {
    this.cargando = true;
    this.gamasService.getAll().subscribe({
      next: (gamas) => {
        this.gamas = gamas;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
      }
    })
  }

  toggleGama(gama: GamaPreventivo): void {
    //console.log('Toggle gama:', gama);

    this.gamasService.changeEstado(
      gama.id_gama,
      !gama.activa
    ).subscribe({
      next: () => {
        //console.log('Gama actualizada');
      this.cargarGamas();
      },
      error: (err) => {
        console.error('Error actualizando gama', err);
      }
    });
  }

  abrirCrearGama(): void {
    this.dialog.open(CrearGamaModalComponent, {
      width: '400px'
    }).afterClosed().subscribe((creada) => {
      if (creada) {
        this.cargarGamas();
      }
    });
  }

  seleccionarGama(gama: GamaPreventivo): void {
    this.gamaSeleccionada = gama;
    this.cargarTareasCatalogo(gama.id_gama);
  }

  cargarTareasCatalogo(idGama: number): void {
  this.cargandoTareas = true;

  this.tareasCatalogoService.getByGama(idGama).subscribe({
      next: (tareas) => {
        this.tareasCatalogo = tareas;
        this.cargandoTareas = false;
      },
      error: () => {
        this.tareasCatalogo = [];
        this.cargandoTareas = false;
      }
    });
  }

  abrirCrearTareaCatalogo(): void {
    if (!this.gamaSeleccionada) return;

    const siguienteOrden =
      this.tareasCatalogo.length > 0
        ? Math.max(...this.tareasCatalogo.map(t => t.orden)) + 1
        : 1;

    this.dialog.open(CrearTareaCatalogoModalComponent, {
      width: '450px',
      data: {
        idGama: this.gamaSeleccionada.id_gama,
        orden: siguienteOrden
      }
    }).afterClosed().subscribe((creada) => {
      if (creada) {
        this.cargarTareasCatalogo(this.gamaSeleccionada!.id_gama);
      }
    });
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}
