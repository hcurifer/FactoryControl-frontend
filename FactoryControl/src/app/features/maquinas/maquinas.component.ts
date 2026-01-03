import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

import { Maquina } from '../../data-access/models/maquina.model';

@Component({
  selector: 'app-maquinas',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule
  ],
  templateUrl: './maquinas.component.html',
  styleUrl: './maquinas.component.scss'
})
export class MaquinasComponent {

  // MOCK temporal (backend)
  maquinas: Maquina[] = [
    {
      id_maquina: 1,
      nombre: 'Prensa Hidráulica 01',
      codigo_maquina: 'PR-H-01',
      ubicacion: 'Nave A',
      estado: 'disponible',
      alarma_activa: false
    },
    {
      id_maquina: 2,
      nombre: 'Robot Soldadura 03',
      codigo_maquina: 'RB-S-03',
      ubicacion: 'Nave B',
      estado: 'parada',
      alarma_activa: true
    },
    {
      id_maquina: 3,
      nombre: 'Cinta Transportadora',
      codigo_maquina: 'CT-12',
      ubicacion: 'Línea 2',
      estado: 'pendiente_preventivo',
      alarma_activa: false
    }
  ];

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
