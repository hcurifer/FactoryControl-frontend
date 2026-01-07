export interface MaquinaCreate {
  nombre: string;
  codigo_maquina: string;
  ubicacion: string;
  estado: 'disponible' | 'pendiente_preventivo' | 'parada';
  alarma_activa: boolean;
  descripcion?: string;
  imagen?: string | null;
  // fecha_alta / fecha_baja existen en backend, pero son opcionales (se autogeneran)
}
