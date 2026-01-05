export interface TareaCatalogoGamaCreate {
  id_gama: number;
  nombre_tarea: string;
  descripcion?: string;
  duracion_horas: number;
  orden: number;
}
