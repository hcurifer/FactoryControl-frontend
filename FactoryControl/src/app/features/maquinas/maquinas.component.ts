import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

import { Maquina } from '../../data-access/models/maquina.model';
import { MaquinaService } from '../../core/services/maquina.service';

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

/** Máquinas obtenidas desde la API */
  maquinas$!: Observable<Maquina[]>;

  constructor(private maquinaService: MaquinaService) {}

  ngOnInit(): void {
    this.maquinas$ = this.maquinaService.getMaquinas();
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
