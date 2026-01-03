export interface Maquina {
  id_maquina: number;
  nombre: string;
  codigo_maquina: string;
  ubicacion: string;
  estado: 'disponible' | 'pendiente_preventivo' | 'parada';
  alarma_activa: boolean;
  descripcion?: string;
  imagen?: string | null;
}
