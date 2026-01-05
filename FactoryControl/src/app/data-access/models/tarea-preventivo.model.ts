export type EstadoTareaPreventivo =
  | 'pendiente'
  | 'completada';

export interface TareaPreventivo {
  id_tarea_asignada: number;
  id_gama: number;
  id_maquina: number;
  id_usuario: number;
  id_tarea_catalogo_gamas: number;

  estado: EstadoTareaPreventivo;
  fecha_asignada: string;
  fecha_completado?: string;
  duracion_horas: number;
  observaciones?: string;
}
