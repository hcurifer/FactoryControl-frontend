import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { GamasPreventivoService } from '../../../../core/services/gamas-preventivo.service';
import { GamaPreventivo } from '../../../../data-access/models/gama-preventivo.model';

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
    private gamasService: GamasPreventivoService
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

  cerrar(): void {
    this.dialogRef.close();
  }
}
