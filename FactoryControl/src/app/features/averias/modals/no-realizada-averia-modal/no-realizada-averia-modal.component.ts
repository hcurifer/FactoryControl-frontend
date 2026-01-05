import { Component } from '@angular/core';
import { MatDialogRef, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-no-realizada-averia-modal',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatDialogActions,
    MatDialogContent
  ],
  templateUrl: './no-realizada-averia-modal.component.html',
  styleUrl: './no-realizada-averia-modal.component.scss'
})
export class NoRealizadaAveriaModalComponent {
  motivo = '';

  constructor(
    private dialogRef: MatDialogRef<NoRealizadaAveriaModalComponent>
  ) {}

  cancelar(): void {
    this.dialogRef.close(null);
  }

  enviar(): void {
    if (!this.motivo.trim()) return;
    this.dialogRef.close(this.motivo);
  }
}
