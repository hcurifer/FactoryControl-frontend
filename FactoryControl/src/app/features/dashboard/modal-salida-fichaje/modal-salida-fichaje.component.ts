import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface ModalSalidaFichajeResult {
  salidaAntesDeTiempo: boolean;
  motivo?: string;
}

@Component({
  selector: 'app-modal-salida-fichaje',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './modal-salida-fichaje.component.html',
  styleUrl: './modal-salida-fichaje.component.scss'
})
export class ModalSalidaFichajeComponent {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalSalidaFichajeComponent>
  ) {
    this.form = this.fb.group({
      salidaAntesDeTiempo: [false],
      motivo: ['']
    });

    this.form.get('salidaAntesDeTiempo')!.valueChanges.subscribe((value) => {
      const motivoCtrl = this.form.get('motivo')!;
      if (value) {
        motivoCtrl.setValidators([Validators.required, Validators.minLength(5)]);
      } else {
        motivoCtrl.clearValidators();
      }
      motivoCtrl.updateValueAndValidity();
    });
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  confirmar(): void {
    if (this.form.invalid) return;

    this.dialogRef.close({
      salidaAntesDeTiempo: this.form.value.salidaAntesDeTiempo!,
      motivo: this.form.value.motivo || undefined
    });
  }
}
