import { Component } from '@angular/core';
import { MatDialogRef, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-crear-averia-modal',
  standalone: true,
  imports: [
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

  constructor(
    private dialogRef: MatDialogRef<CrearAveriaModalComponent>
  ) {}


  cancelar(): void {
    this.dialogRef.close(null);
  }

  crear(): void {
    if (!this.descripcion || !this.id_maquina) return;

    this.dialogRef.close({
      descripcion: this.descripcion,
      prioridad: this.prioridad,
      id_maquina: this.id_maquina
    });
  }

}
