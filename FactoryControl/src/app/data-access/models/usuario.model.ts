export type RolUsuario = 'tecnico' | 'mando' ;

export interface Usuario {
  id_usuario: number;

  numero_empresa: string;
  nombre: string;
  apellidos: string;
  correo: string;

  rol: RolUsuario;
  estado_disponible: boolean;

  imagen?: string | null;

  fecha_alta?: string;
  fecha_baja?: string | null;
}
