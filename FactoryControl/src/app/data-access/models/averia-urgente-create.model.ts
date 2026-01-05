export interface AveriaUrgenteCreate {
  descripcion: string;
  prioridad: string;
  estado: string;
  id_maquina: number;
  id_usuario_asignado: number;
  id_usuario_creador: number;
}
