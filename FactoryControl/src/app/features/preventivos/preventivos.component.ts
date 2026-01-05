import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';

import { AuthService } from '../../core/services/auth.service';
import { TareaPreventivoService } from '../../core/services/tarea-preventivo.service';
import { TareaPreventivoView } from '../../data-access/models/tarea-preventivo.view.model';

@Component({
  selector: 'app-preventivos',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './preventivos.component.html',
  styleUrl: './preventivos.component.scss'
})
export class PreventivosComponent implements OnInit {
  pendientes$!: Observable<TareaPreventivoView[]>;
  completadas$!: Observable<TareaPreventivoView[]>;

  constructor(
    private authService: AuthService,
    private preventivoService: TareaPreventivoService
  ) {}

  ngOnInit(): void {
    const usuario = this.authService.getUser();
    if (!usuario) return;

    const tareas$ = this.preventivoService.getByUsuarioEnriquecidas(
      usuario.id_usuario
    );

    this.pendientes$ = tareas$.pipe(
      map(t => t.filter(x => x.estado === 'pendiente'))
    );

    this.completadas$ = tareas$.pipe(
      map(t => t.filter(x => x.estado === 'completada'))
    );
  }
  completar(tarea: TareaPreventivoView): void {
  this.preventivoService
    .completarTarea(tarea.id_tarea_asignada)
    .subscribe(() => {
      this.ngOnInit(); // recarga limpia
    });
}
}
