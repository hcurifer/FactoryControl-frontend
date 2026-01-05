export interface TareaPreventivoView {
  id_tarea_asignada: number;
  estado: 'pendiente' | 'completada';
  duracion_horas: number;
  observaciones?: string;

  // Datos enriquecidos
  maquina_nombre?: string;
  maquina_ubicacion?: string;

  nombre_tarea?: string;
}
