import { Component, Inject } from '@angular/core';
import { MatDialogRef, MatDialogActions, MatDialogContent, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-completar-averia-modal',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogContent
  ],
  templateUrl: './completar-averia-modal.component.html',
  styleUrl: './completar-averia-modal.component.scss'
})
export class CompletarAveriaModalComponent {

  constructor(
    private dialogRef: MatDialogRef<CompletarAveriaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { descripcion: string }
  ) {}

  cancelar(): void {
    this.dialogRef.close(false);
  }

  confirmar(): void {
    this.dialogRef.close(true);
  }
}
