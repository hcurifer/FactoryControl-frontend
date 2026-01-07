import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatDialogRef, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { MaquinaCreate } from '../../../../data-access/models/maquina-create.model';

@Component({
  selector: 'app-crear-maquina-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule
  ],
  templateUrl: './crear-maquina-modal.component.html',
  styleUrl: './crear-maquina-modal.component.scss'
})
export class CrearMaquinaModalComponent {

  nombre = '';
  codigo_maquina = '';
  ubicacion = '';
  estado: MaquinaCreate['estado'] = 'disponible';
  alarma_activa = false;
  descripcion = '';
  imagen = '';

  constructor(
    private dialogRef: MatDialogRef<CrearMaquinaModalComponent>
  ) {}

  cancelar(): void {
    this.dialogRef.close(null);
  }

  crear(): void {
    if (!this.nombre || !this.codigo_maquina || !this.ubicacion) return;

    const payload: MaquinaCreate = {
      nombre: this.nombre.trim(),
      codigo_maquina: this.codigo_maquina.trim(),
      ubicacion: this.ubicacion.trim(),
      estado: this.estado,
      alarma_activa: this.alarma_activa,
      descripcion: this.descripcion?.trim() || undefined,
      imagen: this.imagen?.trim() || undefined
    };

    this.dialogRef.close(payload);
  }
}
