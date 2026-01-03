import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';

import { Maquina } from '../../../data-access/models/maquina.model';

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
export class MaquinaDetalleModalComponent {
  constructor(
    public dialogRef: MatDialogRef<MaquinaDetalleModalComponent>,
    @Inject(MAT_DIALOG_DATA) public maquina: Maquina
  ) {}

  cerrar(): void {
    this.dialogRef.close();
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
