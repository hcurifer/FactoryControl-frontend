import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../../../../core/services/auth.service';
import { PeticionesDiaService } from '../../../../core/services/peticiones-dia.service';
import { TipoPeticionDia } from '../../../../data-access/models/peticion-dia.model';

@Component({
  selector: 'app-peticion-dia-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './peticion-dia-modal.component.html',
  styleUrl: './peticion-dia-modal.component.scss'
})
export class PeticionDiaModalComponent {
  form: FormGroup;
  loading = false;

  readonly tipos: Array<{ value: TipoPeticionDia; label: string }> = [
    { value: 'licencia', label: 'Licencia' },
    { value: 'disfrute', label: 'Disfrute' },
    { value: 'antiguedad', label: 'Antigüedad' }
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private peticionesDiaService: PeticionesDiaService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<PeticionDiaModalComponent>
  ) {
    const user = this.authService.getUser();

    this.form = this.fb.group({
      tipo_peticion: ['disfrute', Validators.required],
      comentario: ['', [Validators.maxLength(500)]]
    });

    if (!user?.id_usuario) {
      this.snackBar.open('No hay sesión activa. Vuelve a iniciar sesión.', 'Cerrar', { duration: 4500 });
      this.dialogRef.close(false);
    }
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }

  enviar(): void {
    if (this.loading) return;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const user = this.authService.getUser();
    if (!user?.id_usuario) {
      this.snackBar.open('No hay sesión activa. Vuelve a iniciar sesión.', 'Cerrar', { duration: 4500 });
      return;
    }

    const tipo = this.form.value.tipo_peticion as TipoPeticionDia;
    const confirmMsg = `Vas a enviar una petición de día (${tipo}).\n\n¿Confirmas el envío?`;
    if (!confirm(confirmMsg)) return;

    this.loading = true;

    this.peticionesDiaService
      .create({
        id_usuario: user.id_usuario,
        tipo_peticion: tipo,
        comentario: (this.form.value.comentario ?? '').trim() || undefined
      })
      .subscribe({
        next: () => {
          this.snackBar.open('Petición enviada correctamente', 'Cerrar', { duration: 3500 });
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error(err);
          const detail = err?.error?.detail;
          this.snackBar.open(detail ? `Error: ${detail}` : 'Error al enviar la petición', 'Cerrar', { duration: 5000 });
          this.loading = false;
        }
      });
  }
}
