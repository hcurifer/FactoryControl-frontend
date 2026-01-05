import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogContent, MatDialogActions, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { Usuario } from '../../../../data-access/models/usuario.model';
import { Maquina } from '../../../../data-access/models/maquina.model';

@Component({
  selector: 'app-crear-averia-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDialogActions,
    MatDialogContent
  ],
  templateUrl: './crear-averia-modal.component.html',
  styleUrl: './crear-averia-modal.component.scss'
})
export class CrearAveriaModalComponent {
  descripcion = '';
  prioridad = 'media';
  id_maquina!: number;
  id_usuario_asignado!: number;

  constructor(
    private dialogRef: MatDialogRef<CrearAveriaModalComponent>,
     @Inject(MAT_DIALOG_DATA) public data: {
      usuarios: Usuario[];
      maquinas: Maquina[];
    }
  ) {}


  cancelar(): void {
    this.dialogRef.close(null);
  }

  crear(): void {
    if (
      !this.descripcion ||
      !this.id_maquina ||
      !this.id_usuario_asignado
    ) {
      return;
    }

    this.dialogRef.close({
      descripcion: this.descripcion,
      prioridad: this.prioridad,
      estado: 'pendiente',
      id_maquina: this.id_maquina,
      id_usuario_asignado: this.id_usuario_asignado
    });
  }

}
