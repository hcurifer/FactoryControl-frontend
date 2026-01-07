export interface Notificacion {
  id_notificacion?: number;
  tipo: string;
  contenido_resumen: string;
  asunto: string;
  id_averia?: number;
  id_maquina: number;
  id_usuario_origen: number;
  id_usuario_destino: number;
}
