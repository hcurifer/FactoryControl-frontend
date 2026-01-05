export interface FichajeEntradaRequest {
  id_usuario: number;
  comentario?: string;
  fecha: string;
  hora_entrada: string;
}

export interface FichajeSalidaRequest {
  hora_salida: string;
  comentario?: string;
}

export interface FichajeAbiertoResponse {
  id_fichaje?: number;
  id_usuario?: number;
  fecha?: string;
  hora_entrada?: string;
  hora_salida?: string | null;
  comentario?: string | null;
}
