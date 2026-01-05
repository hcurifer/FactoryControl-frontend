import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { GamasPreventivoService } from '../../../../core/services/gamas-preventivo.service';
import { GamaPreventivo } from '../../../../data-access/models/gama-preventivo.model';
import { CrearGamaModalComponent } from '../crear-gama-modal/crear-gama-modal.component';

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

  constructor(
    private dialogRef: MatDialogRef<GestionarGamasModalComponent>,
    private gamasService: GamasPreventivoService,
    private dialog: MatDialog
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

  cerrar(): void {
    this.dialogRef.close();
  }
}
