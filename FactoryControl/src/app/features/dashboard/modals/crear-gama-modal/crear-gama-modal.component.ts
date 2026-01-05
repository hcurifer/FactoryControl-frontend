import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { GamasPreventivoService } from '../../../../core/services/gamas-preventivo.service';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-crear-gama-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule
  ],
  templateUrl: './crear-gama-modal.component.html',
  styleUrl: './crear-gama-modal.component.scss'
})
export class CrearGamaModalComponent {
  form: FormGroup;
  creando = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CrearGamaModalComponent>,
    private gamasService: GamasPreventivoService
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      activa: [true]
    });
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }

  crear(): void {
    if (this.form.invalid) return;

    this.creando = true;

    this.gamasService.create(this.form.value).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Error creando gama', err);
        this.creando = false;
      }
    });
  }
}
