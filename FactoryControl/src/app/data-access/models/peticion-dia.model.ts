export type TipoPeticionDia = 'licencia' | 'disfrute' | 'antiguedad';

export type EstadoPeticionDia = 'pendiente' | 'aprobada' | 'rechazada';

/** Petición de día libre registrada. */
export interface PeticionDia {
  id_peticion: number;
  id_usuario: number;
  tipo_peticion: TipoPeticionDia;
  comentario?: string | null;
  estado: EstadoPeticionDia;
  fecha_resolucion?: string | null;
}

/** Payload para crear una petición de día. */
export interface PeticionDiaCreate {
  id_usuario: number;
  tipo_peticion: TipoPeticionDia;
  comentario?: string;
}
