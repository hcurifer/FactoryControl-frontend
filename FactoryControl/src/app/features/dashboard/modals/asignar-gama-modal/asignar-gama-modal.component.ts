import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Observable } from 'rxjs';

import { Usuario } from '../../../../data-access/models/usuario.model';
import { Maquina } from '../../../../data-access/models/maquina.model';
import { GamaPreventivo } from '../../../../data-access/models/gama-preventivo.model';
import { UsuariosService } from '../../../../core/services/usuarios.service';
import { MaquinaService } from '../../../../core/services/maquina.service';
import { GamasPreventivoService } from '../../../../core/services/gamas-preventivo.service';
import { TareaPreventivoService } from '../../../../core/services/tarea-preventivo.service';

@Component({
  selector: 'app-asignar-gama-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule
  ],
  templateUrl: './asignar-gama-modal.component.html',
  styleUrl: './asignar-gama-modal.component.scss'
})
export class AsignarGamaModalComponent {
  usuarios$: Observable<Usuario[]>;
  maquinas$: Observable<Maquina[]>;
  gamas$: Observable<GamaPreventivo[]>;
  form!: ReturnType<FormBuilder['group']>;

  creando = false;


  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AsignarGamaModalComponent>,
    private usuariosService: UsuariosService,
    private maquinaService: MaquinaService,
    private gamasService: GamasPreventivoService,
    private preventivoService: TareaPreventivoService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
    id_usuario: [null as number | null, Validators.required],
    id_maquina: [null as number | null, Validators.required],
    id_gama: [null as number | null, Validators.required],
    fecha_asignada: [new Date(), Validators.required]
    });

    this.usuarios$ = this.usuariosService.getAll();
    this.maquinas$ = this.maquinaService.getAll();
    this.gamas$ = this.gamasService.getActivas();
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }

  asignar(): void {
    if (this.form.invalid) return;

    const fecha = this.form.value.fecha_asignada as Date;
    const fechaStr = this.toIsoDate(fecha); // YYYY-MM-DD

    this.creando = true;

    this.preventivoService.generar({
      id_usuario: this.form.value.id_usuario!,
      id_maquina: this.form.value.id_maquina!,
      id_gama: this.form.value.id_gama!,
      fecha_asignada: fechaStr
    }).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.creando = false;

        const mensaje =
          err?.error?.detail ??
          'No se han podido generar los preventivos';

        this.snackBar.open(
          mensaje,
          'Cerrar',
          {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          }
        );
      }
    });
  }

  private toIsoDate(d: Date): string {
    // evita problemas de timezone
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
