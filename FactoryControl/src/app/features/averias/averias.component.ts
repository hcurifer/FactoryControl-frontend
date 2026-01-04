import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

import { AveriaUrgente, EstadoAveriaUrgente, PrioridadAveriaUrgente } from '../../data-access/models/averia-urgente.model';
import { AveriaUrgenteService } from '../../core/services/averia-urgente.service';
import { AveriaUrgenteView } from '../../data-access/models/averia-urgente.view.model';


@Component({
  selector: 'app-averias',
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
    MatOptionModule
  ],
  templateUrl: './averias.component.html',
  styleUrl: './averias.component.scss'
})
export class AveriasComponent implements OnInit {

  /** Observable con la lista de averías */
  averias$!: Observable<AveriaUrgenteView[]>;

  constructor(private averiaService: AveriaUrgenteService) {}

  ngOnInit(): void {this.cargarAverias();}

  /** CARGA DE DATOS */

  cargarAverias(): void {
    // this.averias$ = this.averiaService.getAll(); // se comenta por tener un nuevo metodo con datos hechos fork
    this.averias$ = this.averiaService.getAllEnriquecidas();
  }

  /** ACCIONES */

  completarAveria(averia: AveriaUrgente): void {
    if (averia.estado !== 'pendiente') return;

    this.averiaService
      .completarAveria(averia.id_averia)
      .subscribe(() => {
        this.cargarAverias();
      });
  }

  marcarNoRealizada(averia: AveriaUrgente): void {
    if (averia.estado !== 'pendiente') return;

    // abrir modal
    console.log('Abrir modal no realizada:', averia.id_averia);
  }

  /** VISUALES */

  getEstadoLabel(estado: EstadoAveriaUrgente): string {
    switch (estado) {
      case 'pendiente': return 'Pendiente';
      case 'completada': return 'Completada';
      case 'no_realizada': return 'No realizada';
      default: return estado;
    }
  }

  getEstadoColor(estado: EstadoAveriaUrgente): string {
    switch (estado) {
      case 'pendiente': return 'warn';
      case 'completada': return 'primary';
      case 'no_realizada': return 'accent';
      default: return '';
    }
  }

  getPrioridadLabel(prioridad: PrioridadAveriaUrgente): string {
    switch (prioridad) {
      case 'baja': return 'Baja';
      case 'media': return 'Media';
      case 'alta': return 'Alta';
      case 'critica': return 'Crítica';
      default: return prioridad;
    }
  }

estadoFiltro: EstadoAveriaUrgente | 'todos' = 'todos';
prioridadFiltro: string = 'todas';

aplicarFiltros(): void {
  this.averias$ = this.averiaService.getAllEnriquecidas().pipe(
    map(averias =>
      averias.filter(a =>
        (this.estadoFiltro === 'todos' || a.estado === this.estadoFiltro) &&
        (this.prioridadFiltro === 'todas' || a.prioridad === this.prioridadFiltro)
      )
    )
  );
}

}
