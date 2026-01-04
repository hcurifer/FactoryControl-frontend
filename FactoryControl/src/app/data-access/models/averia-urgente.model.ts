export type EstadoAveriaUrgente =
  | 'pendiente'
  | 'completada'
  | 'no_realizada';

export type PrioridadAveriaUrgente =
  | 'baja'
  | 'media'
  | 'alta'
  | 'critica';

export interface AveriaUrgente {

  /** Identificador */
  id_averia: number;

  /** Datos principales */
  descripcion: string;
  estado: EstadoAveriaUrgente;
  prioridad: PrioridadAveriaUrgente;

  /** Relaciones */
  id_maquina: number;
  id_usuario_asignado?: number | null;
  id_usuario_creador?: number; // viene en swagger

  /** Fechas */
  fecha_creacion?: string;     // ISO
  fecha_cierre?: string | null; // swagger devuelve fecha_cierre
  fecha_actualizacion?: string; // por si backend la añade luego

  /** Solo si estado === 'no_realizada' */
  motivo_no_realizada?: string | null;

  /* =====================================================
     CAMPOS EXPANDIDOS (NO VIENEN DEL BACKEND AÚN)
     → se usan solo para UX / mockup
     → no rompen nada si no vienen
  ===================================================== */

  maquina_nombre?: string;
  maquina_ubicacion?: string;

  tecnico_nombre?: string;
  tecnico_apellidos?: string;
}
