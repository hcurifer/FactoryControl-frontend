import { TareaCatalogoGamaCreate } from './../../../../data-access/models/tarea-catalogo-gama-create.model';
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { TareasCatalogoGamasService } from '../../../../core/services/tareas-catalogo-gamas.service';
import { TareaCatalogoGama } from '../../../../data-access/models/tarea-catalogo-gama.model';


@Component({
  selector: 'app-crear-tarea-catalogo-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './crear-tarea-catalogo-modal.component.html',
  styleUrl: './crear-tarea-catalogo-modal.component.scss'
})
export class CrearTareaCatalogoModalComponent {

  form!: ReturnType<FormBuilder['group']>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CrearTareaCatalogoModalComponent>,
    private tareasService: TareasCatalogoGamasService,
    @Inject(MAT_DIALOG_DATA) public data: { idGama: number; orden: number }
  ) {
      this.form = this.fb.group({
        nombre: ['', Validators.required],
        descripcion: [''],
        duracion: [0.5, Validators.required],
        orden: [this.data.orden]
      });
    }

  cancelar(): void {
    this.dialogRef.close(false);
  }

  crear(): void {
    if (this.form.invalid) return;

    const payload: TareaCatalogoGamaCreate = {
      nombre_tarea: this.form.value.nombre!,
      descripcion: this.form.value.descripcion ?? '',
      duracion_horas: this.form.value.duracion!,
      orden: this.form.value.orden!,
      id_gama: this.data.idGama,
    };

    this.tareasService.create(payload).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Error creando tarea de catálogo', err);
      }
    });
  }
}
