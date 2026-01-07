import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UsuariosService } from '../../../../core/services/usuarios.service';
import { Usuario } from '../../../../data-access/models/usuario.model';
import { CrearUsuarioModalComponent } from '../crear-usuario-modal/crear-usuario-modal.component';

@Component({
  selector: 'app-gestionar-usuarios-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ],
  templateUrl: './gestionar-usuarios-modal.component.html',
  styleUrl: './gestionar-usuarios-modal.component.scss'
})
export class GestionarUsuariosModalComponent implements OnInit{
  usuarios: Usuario[] = [];
  filtro: 'todos' | 'activos' | 'baja' = 'todos';
  cargando = false;

  constructor(
    private usuariosService: UsuariosService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.cargando = true;

    const request =
      this.filtro === 'activos'
        ? this.usuariosService.getActivos()
        : this.filtro === 'baja'
        ? this.usuariosService.getInactivos()
        : this.usuariosService.getAll();

    request.subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
        this.cargando = false;
      },
      error: () => {
        this.snackBar.open('Error al cargar usuarios', 'Cerrar', {
          duration: 4000
        });
        this.cargando = false;
      }
    });
  }

  cambiarFiltro(filtro: 'todos' | 'activos' | 'baja'): void {
    this.filtro = filtro;
    this.cargarUsuarios();
  }

  abrirCrearUsuario(): void {
    const dialogRef = this.dialog.open(CrearUsuarioModalComponent, {
      width: '780px',
      maxWidth: '95vw',
      panelClass: 'fc-dialog-mock',
      disableClose: true,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe((creado) => {
      if (creado) {
        this.cargarUsuarios();
      }
    });
  }

  darDeBaja(usuario: Usuario): void {
    this.usuariosService.deleteLogico(usuario.id_usuario).subscribe({
      next: () => {
        this.snackBar.open('Usuario dado de baja', 'Cerrar', {
          duration: 3000
        });
        this.cargarUsuarios();
      },
      error: () => {
        this.snackBar.open('Error al dar de baja', 'Cerrar', {
          duration: 4000
        });
      }
    });
  }
}

