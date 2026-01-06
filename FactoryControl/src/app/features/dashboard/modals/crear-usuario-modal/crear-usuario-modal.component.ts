import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UsuariosService } from '../../../../core/services/usuarios.service';

@Component({
  selector: 'app-crear-usuario-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './crear-usuario-modal.component.html',
  styleUrl: './crear-usuario-modal.component.scss'
})
export class CrearUsuarioModalComponent {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CrearUsuarioModalComponent>
  ) {
    this.form = this.fb.group({
    numero_empresa: ['', Validators.required],
    nombre: ['', Validators.required],
    apellidos: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    contrasena: ['', Validators.required],
    rol: ['tecnico', Validators.required],
    estado_disponible: [true]
  });
  }

  crearUsuario(): void {
    if (this.form.invalid) {
      return;
    }

    this.usuariosService.create(this.form.value as any).subscribe({
      next: () => {
        this.snackBar.open(
          'Usuario creado correctamente',
          'Cerrar',
          { duration: 3000 }
        );
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error(error);
        this.snackBar.open(
          'Error al crear el usuario',
          'Cerrar',
          { duration: 4000 }
        );
      }
    });
  }

}
