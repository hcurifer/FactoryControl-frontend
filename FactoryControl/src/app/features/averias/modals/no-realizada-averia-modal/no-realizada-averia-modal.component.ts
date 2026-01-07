import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogContent, MatDialogActions, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';


import { AveriaUrgenteService } from '../../../../core/services/averia-urgente.service';
import { Notificacion } from '../../../../data-access/models/notificaciones.model';
import { NotificacionesService } from '../../../../core/services/notificaciones.service';

@Component({
  selector: 'app-no-realizada-averia-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
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
  notificar = false;

  constructor(
    private averiasService: AveriaUrgenteService,
    private snackBar: MatSnackBar,
    private notificacionesService: NotificacionesService,
    private dialogRef: MatDialogRef<NoRealizadaAveriaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      idAveria: number;
      idMaquina: number;
      idUsuarioActual: number;
      idMando: number;
    }
  ) {}

  cancelar(): void {
    this.dialogRef.close(null);
  }

  enviar(): void {
    const mensajeConfirmacion = this.notificar
      ? 'Vas a actualizar el estado de la avería y enviar una notificación automática por correo al mando a cargo. ¿Deseas continuar?'
      : 'Vas a actualizar el estado de la avería sin enviar ninguna notificación al mando a cargo. ¿Deseas continuar?';

    if (!confirm(mensajeConfirmacion)) {
      return;
    }

    // PATCH → avería no realizada
    this.averiasService
      .marcarNoRealizada(this.data.idAveria, this.motivo)
      .subscribe({
        next: () => {

          if (this.notificar) {
            this.crearNotificacion();
          }
          this.snackBar.open(
          this.notificar
            ? 'Avería actualizada y notificación enviada correctamente'
            : 'Avería marcada como no realizada',
            'Cerrar',
            {
              duration: 3500,
              horizontalPosition: 'end',
              verticalPosition: 'top'
            }
          );

          this.dialogRef.close(true);
        },
        error: () => {
          this.snackBar.open(
            'Error al actualizar la avería',
            'Cerrar',
            {
              duration: 4000,
              horizontalPosition: 'end',
              verticalPosition: 'top'
            }
          );
        }
      });
  }

  private crearNotificacion(): void {
    const notificacion: Notificacion = {
      tipo: 'averia_no_realizada',
      contenido_resumen: 'Avería no realizada',
      asunto: 'La avería no ha podido completarse',
      id_averia: this.data.idAveria,
      id_maquina: this.data.idMaquina,
      id_usuario_origen: this.data.idUsuarioActual,
      id_usuario_destino: this.data.idMando
    };

    this.notificacionesService.crearNotificacion(notificacion).subscribe(
      {
      error: () => {
        this.snackBar.open(
          'La avería se actualizó, pero falló el envío de la notificación',
          'Cerrar',
          {
            duration: 5000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          }
        );
      }
    });
  }
}
