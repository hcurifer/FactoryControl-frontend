export type RolUsuario = 'tecnico' | 'mando';

export interface AuthMeResponse {
  numero_empresa: string;
  nombre: string;
  apellidos: string;
  correo: string;
  rol: RolUsuario;
  estado_disponible: boolean;
  imagen: string | null;
  id_usuario: number;
  fecha_alta: string;
  fecha_baja: string | null;
}
